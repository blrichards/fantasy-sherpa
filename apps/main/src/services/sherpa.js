import { create } from 'apisauce'

const api = create({
  baseURL: '/api'
})

const getUser = () => api.get('/user')

const getLeagues = () => api.get('/ysports/leagues')

const getGames = () => api.get('/ysports/games')

const sherpaApi = {
  getUser,
  getLeagues,
  getGames,
}

export default sherpaApi
