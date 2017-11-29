import { put, call } from 'redux-saga/effects'
import { UserActions } from '../redux/UserRedux'

import { create } from 'apisauce'

const yahooApi = create({
  baseURL: 'http://fantasysports.yahooapis.com/fantasy/v2'
})

export function * startup(api) {
  yield put(UserActions.setFetching(true))
  // const response = yield call(api.getUser)
  const response = yield call(api.getGames)
  console.log(response)
  // yahooApi.setHeader('Authorization', 'Bearer ' + response.data.accessToken)
  // const yResponse = yield call(yahooApi.get, '/game/nfl/')
  // console.tron.log(yResponse)
  yield put(UserActions.setFetching(false))
}
