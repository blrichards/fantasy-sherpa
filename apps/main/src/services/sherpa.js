import { create } from 'apisauce'

const api = create({
  baseURL: '/api'
})

const getUser = () => api.get('/user')

const getLeagues = () => api.get('/ysports/leagues')

const sherpaApi = {
  getUser,
  getLeagues,
}

export default sherpaApi
