import Immutable from 'seamless-immutable'
import {createReducer, createActions} from 'reduxsauce'

/** Types and Actions **/

const {Types, Creators} = createActions({
  setFetching: ['fetching'],
  setLeagues: ['leagues'],
})

export const UserTypes = Types
export const UserActions = Creators

/** Initial State **/

export const INITIAL_STATE = Immutable({
  fetching: false,
  leagues: [],
})

/** Reducers **/

const setFetching = (state, {fetching}) => state.merge({fetching})

const setLeagues = (state, {leagues}) => state.merge({leagues})

/** Hookup Reducers to Types **/

export const UserReducer = createReducer(INITIAL_STATE, {
  [Types.SET_FETCHING]: setFetching,
  [Types.SET_LEAGUES]: setLeagues,
})

/** Selectors **/

export const UserSelectors = {
  currentLeagueKey: (state) => {
    const [{league_key: leagueKey}] = state.user.leagues
    return leagueKey
  },
  leagues: (state) => state.user.leagues,
  fetching: (state) => state.user.fetching,
}
