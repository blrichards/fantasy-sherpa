import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

/** Types and Actions **/

const { Types, Creators } = createActions({
  setFetching: ['fetching']
})

export const UserTypes = Types
export const UserActions = Creators

/** Initial State **/

export const INITIAL_STATE = Immutable({
  fetching: false
})

/** Reducers **/

const setFetching = (state, { fetching }) => state.merge({ fetching })

/** Hookup Reducers to Types **/

export const UserReducer = createReducer(INITIAL_STATE, {
  [Types.SET_FETCHING]: setFetching,
})
