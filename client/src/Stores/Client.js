import { observable, action, computed } from 'mobx'

import { yahooAuthApi } from '../Services/yahoo'

// import OAuth2 from 'simple-oauth2'
//
// const credentials = {
//   client: {
//     id: 'dj0yJmk9SWVMTVRTV2JOakVxJmQ9WVdrOVNVeG1kREo2TkhVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zNg--',
//     secret: '8a00e550e3f1e0132d84a1bd7a0627e1896483fa'
//   },
//   auth: {
//     tokenHost: 'https://api.login.yahoo.com/oauth2/request_auth'
//   }
// }

export const ClientState = Object.freeze({
  DONE: Symbol('done'),
  FETCHING: Symbol('fetching'),
  ERROR: Symbol('error'),
})

export class Client {
  @observable state = ClientState.DONE
  @observable league = null
  @computed get loggedIn() {
    return this._profile !== null
  }

  error = null
  static _apiKey = 'dj0yJmk9SWVMTVRTV2JOakVxJmQ9WVdrOVNVeG1kREo2TkhVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zNg--'
  static _apiSecret = '8a00e550e3f1e0132d84a1bd7a0627e1896483fa'
  _swid = null
  _s2 = null
  _profile = null

  @action
  async authorize (username, password) {
    console.tron.log('here')
    const response = await yahooAuthApi.get('/request_auth', {
      'client_id': Client._apiKey,
      'response_type': 'id_token',
      'redirect_uri': 'https://fantasysherpa.github.io/web',
      scope: 'openid fspt-w',
      nonce: '8a00e550e3f1e0132d84a1bd7a0627e1896483fa',
    })
    // const yf = new YahooFantasy(this._apiKey, this._apiSecret)

    // this.state = ClientState.FETCHING
    // const keyResponse = await authApi.post('/api-key?langPref=en-US')
    //
    // if (!keyResponse.ok || keyResponse.headers['api-key'] === null) {
    //   this.error = 'Failed to get API key'
    //   this.state = ClientState.ERROR
    //   return
    // }
    //
    // this._apiKey = keyResponse.headers['api-key']
    // authApi.setHeader('authorization', `APIKEY ${this._apiKey}`)
    //
    // const loginResponse = await authApi.post('/guest/login?langPref=en-US', {
    //   loginValue: username,
    //   password,
    // })
    //
    // if (!loginResponse.ok || loginResponse.data['error'] !== null) {
    //   this.error = 'Unable to authorize user'
    //   this.state = ClientState.ERROR
    //   return
    // }
    //
    // const data = loginResponse.data['data']
    // this._swid = data.profile['swid']
    // this._s2 = data['s2']
    // this._profile = data.profile
    // this.state = ClientState.DONE
  }

  @action
  async setLeague (leagueId, year) {
    // if (this._profile === null) {
    //   this.error = 'Please login to your espn account and try again'
    //   this.state = ClientState.ERROR
    //   return
    // }
    //
    // this.state = ClientState.FETCHING
    //
    // const response = await espnApi.get('/leagueSettings', {
    //   'leagueId': leagueId,
    //   'seasonId': year
    // }, {
    //   headers: {
    //     Cookie: `espn_s2=${this._s2}; SWID=${this._swid};`
    //   }
    // })
    //
    // if (!response.ok) {
    //   this.error = 'Invalid leagueId or year'
    //   this.state = ClientState.ERROR
    //   return
    // }
    //
    // this.state = ClientState.DONE
    // this.league = response.data
  }

  @action
  clearError () {
    this.error = null
    this.state = ClientState.DONE
  }
}

export default new Client()