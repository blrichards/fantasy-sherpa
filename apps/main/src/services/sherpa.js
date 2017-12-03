import { create } from 'apisauce'
import Reactotron from 'reactotron-react-js'

const api = create({
  baseURL: '/api'
})

// Hookup reactotron for debugging
api.addMonitor(Reactotron.apisauce)

/** API calls **/

const getUser = () => api.get('/user')

const getLeagues = () => api.get('/ysports/leagues')

const getGames = () => api.get('/ysports/games')

const getTeams = (leagueKey) => api.get('/ysports/league/teams', {
  league_key: leagueKey
})

const getRoster = (teamKey) => api.get('/ysports/team/roster', {
  team_key: teamKey
})

const sherpaApi = {
  getUser,
  getLeagues,
  getGames,
  getTeams,
  getRoster,
}

export default sherpaApi
