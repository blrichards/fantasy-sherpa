import { create } from 'apisauce'

export const yahooAuthApi = create({
  baseURL: 'https://api.login.yahoo.com/oauth2'
})

yahooAuthApi.addMonitor(console.tron.apisauce)