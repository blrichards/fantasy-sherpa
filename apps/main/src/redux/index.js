import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import { UserReducer } from './UserRedux'

export default () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    combineReducers({
      user: UserReducer,
    }),
    applyMiddleware(sagaMiddleware),
  )

  sagaMiddleware.run(rootSaga)

  return store
}
