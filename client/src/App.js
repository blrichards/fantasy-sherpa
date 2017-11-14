import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import PropTypes from 'prop-types'

import { __DEV__ } from './Config/DebugConfig'
import { Client, ClientState } from './Stores/Client'
import PlayerCard from './Components/PlayerCard/index'
import './App.css'

const espnUsername = 'blrichards@utexas.edu'
const espnPassword = 'Benton97'

@observer
class App extends Component {
  static propTypes = {
    client: PropTypes.instanceOf(Client).isRequired,
  }

  constructor (props) {
    super(props)

    const { client } = this.props
    client.authorize(espnUsername, espnPassword).then(() => {
      if (client.loggedIn) {
          client.setLeague('16201', '2016').then(() => {
            console.tron.log(client.league)
          })
      }
    })
  }

  render () {
    const { client } = this.props
    if (client.state === ClientState.ERROR)
      alert(client.error)

    return (
      <div className="App">
        <PlayerCard
          playerName={'Antonio Brown'}
          position={'WR'}
          ranking={'1st'}
          projected={13.1}
          rating={5}
        />
        <PlayerCard
          playerName={'Odell Beckham Jr.'}
          position={'WR'}
          ranking={'2nd'}
          projected={13.5}
          rating={5}
        />
        <PlayerCard
          playerName={'Julio Jones'}
          position={'WR'}
          ranking={'3rd'}
          projected={15}
          rating={5}
        />
        {__DEV__ ? <DevTools/> : null}
      </div>
    )
  }

  componentDidUpdate () {
    const { client } = this.props
    if (client.state === ClientState.ERROR)
      client.clearError()
  }
}

export default App
