import { call, put, select } from 'redux-saga/effects'

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
    console.tron.log(roster)
  } catch (e) {
    console.tron.error(e)
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

const includePlayerFields = {
  player_key: 'playerKey',
  player_id: 'playerId',
  name: 'name',
  editorial_team_full_name: 'teamName',
  editorial_team_abbr: 'teamAbbr',
  uniform_number: 'number',
  display_position: 'position',
  url: 'url',
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
    return player
  }, {})
}
