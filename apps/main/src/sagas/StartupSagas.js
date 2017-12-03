import {put, call, select} from 'redux-saga/effects'

import {UserActions, UserSelectors} from '../redux/UserRedux'
import { flattenTo } from '../transforms/ApiResponses'

export function* startup(api) {
  // Start loading spinner
  yield put(UserActions.setFetching(true, 'fetching your leagues...'))

  // Fetch league data and store in redux
  try {
    const leagues = yield call(fetchLeagues, api)
    yield put(UserActions.setLeagues(leagues))
  } catch (e) {
    console.tron.error(e)
  }

  // Stop loading spinner
  yield put(UserActions.setFetching(false))
}

//////////////////////////////
//     Helper functions     //
//////////////////////////////

function *fetchLeagues(api) {
  // Call API
  const { ok, problem, data } = yield call(api.getLeagues)
  if (!ok)
    throw new Error(problem)

  // flatten json data
  const flattened = flattenTo(data, key => key === 'league')

  // get info for all leagues
  return Object.keys(flattened).reduce((buf, key) => {
    if (key.endsWith('league'))
      buf.push(flattened[key]['0'])
    return buf
  }, []).sort((a, b) => {
    // Sort by league key in reverse order
    return a['league_key'].localeCompare(b['league_key']) * -1
  })
}

