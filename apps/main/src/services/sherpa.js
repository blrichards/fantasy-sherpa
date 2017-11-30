import { create } from 'apisauce'

const api = create({
  baseURL: '/api'
})

const getUser = () => api.get('/user')

const getLeagues = (game_keys) => api.get('/ysports/leagues', {
  game_keys
})

const getGames = () => api.get('/ysports/games')
const getTeams = () => api.get('/ysports/teams')

const sherpaApi = {
  getUser,
  getLeagues,
  getGames,
  getTeams,
}

export default sherpaApi
