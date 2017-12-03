import { delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { UserActions, UserSelectors } from '../redux/UserRedux'

export function *initLeague(api, { index }) {
  const league = (yield select(UserSelectors.leagues))[index]
  yield put(UserActions.setFetching(true, `Getting the deats on "${league.name}"...`))

  // TODO: actually fetch league data
  yield call(delay, 5000)

  yield put(UserActions.setLeague(league))
  yield put(UserActions.setFetching(false, null))
}
