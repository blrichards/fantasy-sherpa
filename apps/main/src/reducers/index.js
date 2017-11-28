import { createStore, combineReducers } from 'redux'
import UserReducer from './user'

export default () => {
  return createStore(combineReducers({
    user: UserReducer
  }))
}
