import { call, put, all, select } from 'redux-saga/effects'

import { UserActions, UserSelectors } from '../redux/UserRedux'
import { flattenTo } from '../transforms/ApiResponses'

export function *initLeague(api, { index }) {
  const league = (yield select(UserSelectors.leagues))[index]
  yield put(UserActions.setFetching(true, `Getting the deats on "${league.name}".`))

  try {
    const teams = yield call(fetchLeagueTeams, api, league)
    yield put(UserActions.setTeams(teams))

    const team = yield call(findUserTeam, api, teams)
    yield put(UserActions.setTeam(team))

    const roster = yield call(fetchTeamRoster, api, team)
    yield put(UserActions.setRoster(roster))

    const recommendations = yield call(generateRecommendations, api, league, roster)
    yield put(UserActions.setRecommendations(recommendations))
  } catch (e) {
    console.error(e)
  }

  yield put(UserActions.setLeague(league))
  yield put(UserActions.setFetching(false, null))
}

//////////////////////////////
//     Helper functions     //
//////////////////////////////

function *fetchLeagueTeams(api, league) {
  const { league_key: leagueKey } = league

  // Call API
  const { ok, problem, data } = yield call(api.getTeams, leagueKey)
  if (!ok)
    throw new Error(problem)

  // flatten json data
  const flattened = flattenTo(data, key => key === 'team')

  // get info for all teams
  return Object.keys(flattened).reduce((buf, x) => {
    if (!x.endsWith('team'))
      return buf
    buf.push(parseTeam(flattened[x]))
    return buf
  }, [])
}

const includeTeamFields = {
  team_key: 'teamKey',
  team_id: 'teamId',
  name: 'name',
  url: 'url',
  team_logo: 'teamLogo',
  division_id: 'divisionId',
  waiver_priority: 'waiverPriority',
  number_of_moves: 'numberOfMoves',
  number_of_trades: 'numberOfTrades',
  roster_adds: 'rosterAdds',
  league_scoring_type: 'leagueScoringType',
  has_draft_grade: 'hasDraftGrade',
  draft_grade: 'draftGrade',
  draft_recap_url: 'draftRecapUrl',
  managers: 'managers',
}

function parseTeam(data) {
  const flattenedTeam = flattenTo(data, (y) => includeTeamFields[y])

  return Object.keys(flattenedTeam).reduce((team, y) => {
    const fieldKeys = y.split('/')
    const fieldName = includeTeamFields[fieldKeys[fieldKeys.length - 1]]
    if (fieldName === 'managers') {
      const flattenedManagers = flattenTo(flattenedTeam[y], (z) => z === 'manager')
      Object.keys(flattenedManagers).forEach(z => {
        team.managers.push(flattenedManagers[z])
      })
    } else {
      team[fieldName] = flattenedTeam[y]
    }
    return team
  }, { managers: [] })
}

function *findUserTeam(api, teams) {
  const { data: { guid = null } = {} } = yield call(api.getUser)
  if (!guid)
    throw new Error('couldn\'t get user')
  let userTeam = null

  teams.some(team => {
    const userFound = team.managers.some(manager => {
      return manager.guid === guid
    })
    if (userFound)
      userTeam = team
    return userFound
  })

  return userTeam
}

function *fetchTeamRoster(api, team) {
  const { teamKey } = team

  // Call API
  const { ok, problem, data } = yield call(api.getRoster, teamKey)
  if (!ok)
    throw new Error(problem)

  return parsePlayers(data)
}

const includePlayerFields = {
  player_key: 'playerKey',
  player_id: 'playerId',
  name: 'name',
  editorial_team_full_name: 'teamName',
  editorial_team_abbr: 'teamAbbr',
  uniform_number: 'number',
  display_position: 'position',
  url: 'url',
  status: 'status',
  status_full: 'status_full',
  selected_position: 'selectedPosition',
}

function parsePlayer(data) {
  const flattenedPlayer = flattenTo(data, (y) => includePlayerFields[y])

  return Object.keys(flattenedPlayer).reduce((player, y) => {
    const fieldKeys = y.split('/')
    const jsonName = fieldKeys[fieldKeys.length - 1]
    if (!includePlayerFields[jsonName])
      return player
    const fieldName = includePlayerFields[jsonName]
    player[fieldName] = flattenedPlayer[y]
    if (fieldName === 'selectedPosition')
      player[fieldName] = player[fieldName][player[fieldName].length - 1]['position']
    return player
  }, {})
}

function parsePlayers(data) {
  // flatten json data
  const flattened = flattenTo(data, key => key === 'player')

  // get info for all players
  return Object.keys(flattened).reduce((buf, x) => {
    if (!x.endsWith('player'))
      return buf
    buf.push(parsePlayer(flattened[x]))
    return buf
  }, [])
}

function *fetchPlayers(api, league, start, count, playerRank) {
  const { ok, problem, data } = yield call(api.getPlayers, league.league_key, start, count)
  if (!ok)
    throw new Error('Error fetching league players: ' + problem)

  const players = parsePlayers(data)
  /* Build ranking map */
  players.forEach((player, rank) => {
    if (!playerRank[player.position])
      playerRank[player.position] = {}
    const position = playerRank[player.position]
    position[player.playerId] = rank + start + 1
  })
}

function *fetchTakenPlayers(api, league, start, count, takenPlayers) {
  const { ok, problem, data } = yield call(api.getTakenPlayers, league.league_key, start, count)
  if (!ok)
    throw new Error('Error fetching league players: ' + problem)
  takenPlayers.push(...parsePlayers(data))
}

function *generateRecommendations(api, league, roster) {
  /* Separate team into lineup and bench players */
  const team = roster.reduce((players, player) => {
    const { lineup, bench } = players
    if (player.selectedPosition === 'BN') {
      if (!bench[player.position])
        bench[player.position] = []
      bench[player.position].push(player)
    } else {
      if (!lineup[player.position])
        lineup[player.position] = []
      lineup[player.position].push(player)
    }
    return players
  }, { lineup: {}, bench: {} })

  /* Fetch league players */
  const playerCalls = []
  const takenPlayerCalls = []
  for (let start = 0; start < 1000; start += 25)
    playerCalls.push({ start, count: 25 })
  for (let start = 0; start < 225; start += 25)
    takenPlayerCalls.push({ start, count: 25 })

  const playerRank = {}
  const takenPlayers = []
  yield all([
    ...playerCalls.map(options => call(fetchPlayers, api, league, options.start, options.count, playerRank)),
    ...takenPlayerCalls.map(options => call(fetchTakenPlayers, api, league, options.start, options.count, takenPlayers))
  ])

  /* Remove taken players */
  const myPlayers = new Set()
  roster.forEach(player => myPlayers.add(player.playerId))
  takenPlayers.forEach(player => {
    if (!playerRank[player.position])
      playerRank[player.position] = {}
    const position = playerRank[player.position]
    if (!myPlayers.has(player.playerId))
      delete position[player.playerId]
  })

  /* Generate recommendations */
  const recs = new Set()
  Object.keys(playerRank).forEach(position => {
    const positionRank = playerRank[position]

    const lineup = team.lineup[position] || []
    lineup.forEach(starter => {
      const bench = team.bench[position] || []
      bench.forEach(benched => {
        if (benched.status !== undefined)
          return
        // console.tron.log(positionRank)
        // console.tron.log(benched.playerId)
        const benchedRank = positionRank[benched.playerId]
        const starterRank = positionRank[starter.playerId]
        if ((starter.status !== undefined || benchedRank < starterRank) && !recs.has(benched)) {
          // console.tron.log(benchedRank)
          benched.ranking = benchedRank
          benched.rating = 5
          recs.add(benched)
        }
      })
    })
  })

  const recommendations = [...recs].sort((a, b) => {
    if (a.ranking < b.ranking)
      return -1
    else if (a.ranking > b.ranking)
      return 1
    return 0
  })

  return recommendations
}
