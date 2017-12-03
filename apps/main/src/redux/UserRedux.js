import Immutable from 'seamless-immutable'
import {createReducer, createActions} from 'reduxsauce'

/** Types and Actions **/

const {Types, Creators} = createActions({
  setFetching: ['fetching', 'message'],
  setLeagues: ['leagues'],
  setLeague: ['league'],
  initLeague: ['index'],
})

export const UserTypes = Types
export const UserActions = Creators

/** Initial State **/

export const INITIAL_STATE = Immutable({
  fetching: false,
  message: null,
  leagues: [],
  league: null,
})

/** Reducers **/

const setFetching = (state, {fetching, message}) => state.merge({fetching, message})

const setLeagues = (state, {leagues}) => state.merge({leagues})

const setLeague = (state, {league}) => state.merge({league})

/** Hookup Reducers to Types **/

export const UserReducer = createReducer(INITIAL_STATE, {
  [Types.SET_FETCHING]: setFetching,
  [Types.SET_LEAGUES]: setLeagues,
  [Types.SET_LEAGUE]: setLeague,
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
