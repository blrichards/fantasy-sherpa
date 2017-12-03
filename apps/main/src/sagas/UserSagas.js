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
    console.tron.log(yield select(UserSelectors.team))
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

  // get info for all leagues
  return Object.keys(flattened).reduce((buf, x) => {
    if (!x.endsWith('team'))
      return buf
    buf.push(parseTeam(flattened[x]))
    return buf
  }, [])
}

const includeTeamFields = new Set([
  'team_key',
  'team_id',
  'name',
  'url',
  'team_logo',
  'division_id',
  'waiver_priority',
  'number_of_moves',
  'number_of_trades',
  'roster_adds',
  'league_scoring_type',
  'has_draft_grade',
  'draft_grade',
  'draft_recap_url',
  'managers',
])

function parseTeam(x) {
  const flattenedTeam = flattenTo(x, (y) => includeTeamFields.has(y))

  return Object.keys(flattenedTeam).reduce((team, y) => {
    const fieldKeys = y.split('/')
    const fieldName = fieldKeys[fieldKeys.length - 1]
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
