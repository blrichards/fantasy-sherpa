import { put, call } from 'redux-saga/effects'
import { UserActions } from '../redux/UserRedux'

export function * startup(api) {
  yield put(UserActions.setFetching(true))
  let response = yield call(api.getLeagues)
  yield put(UserActions.setFetching(false))
  console.tron.log(response)

  response = yield call(api.getUser)
  console.tron.log(response.data)
}
