import {create} from 'apisauce'

export const espnApi = create({
  baseURL: 'http://games.espn.com/ffl/api/v2',
  headers: {'Accept': 'application/json'},
})

export const authApi = create({
  baseURL: 'https://registerdisney.go.com/jgc/v5/client/ESPN-FANTASYLM-PROD',
  headers: { 'Content-Type': 'application/json' }
})

espnApi.addMonitor(console.tron.apisauce)
authApi.addMonitor(console.tron.apisauce)