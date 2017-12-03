import Immutable from 'seamless-immutable'
import {createReducer, createActions} from 'reduxsauce'

/** Types and Actions **/

const {Types, Creators} = createActions({
  setFetching: ['fetching', 'message'],
  setLeagues: ['leagues'],
  setLeague: ['league'],
  initLeague: ['index'],
  setTeams: ['teams'],
  setTeam: ['team'],
})

export const UserTypes = Types
export const UserActions = Creators

/** Initial State **/

export const INITIAL_STATE = Immutable({
  fetching: false,
  message: null,
  leagues: [],
  league: null,
  teams: [],
  team: null,
})

/** Reducers **/

const setFetching = (state, {fetching, message}) => state.merge({fetching, message})

const setLeagues = (state, {leagues}) => state.merge({leagues})

const setLeague = (state, {league}) => state.merge({league})

const setTeams = (state, {teams}) => state.merge({teams})

const setTeam = (state, {team}) => state.merge({team})

/** Hookup Reducers to Types **/

export const UserReducer = createReducer(INITIAL_STATE, {
  [Types.SET_FETCHING]: setFetching,
  [Types.SET_LEAGUES]: setLeagues,
  [Types.SET_LEAGUE]: setLeague,
  [Types.SET_TEAMS]: setTeams,
  [Types.SET_TEAM]: setTeam,
})

/** Selectors **/

export const UserSelectors = {
  currentLeagueKey: (state) => {
    const [{league_key: leagueKey}] = state.user.leagues
    return leagueKey
  },
  leagues: (state) => state.user.leagues,
  teams: (state) => state.user.teams,
  fetching: (state) => state.user.fetching,
  team: (state) => state.user.team,
}
