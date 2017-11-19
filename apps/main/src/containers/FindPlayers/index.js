import React, { Component } from 'react'
import { observer } from 'mobx-react'

import styles from './styles.css'
import PlayerCard from '../../components/PlayerCard'

@observer
class Players extends Component {
  render () {
    return (
      <div className={styles.FindPlayers}>
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
