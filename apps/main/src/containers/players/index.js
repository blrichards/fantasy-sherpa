import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './styles.css'

import PlayerCard from '../../components/player-card'

@observer
class Players extends Component {

  render () {
    return (
      <div className="App">
        <PlayerCard
          rating={5}
          position='WR'
          ranking='1st'
          projected={13.5}
          playerName='Antonio Brown'
        />
      </div>
    )
  }
}

export default Players
