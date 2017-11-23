import React, { Component } from 'react'

import FilterBar from '../../components/FilterBar'
import PlayerSuggestions from '../../components/PlayerSuggestions'
import styles from './styles.styl'

const playerData = [
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
  { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
]

class FindPlayers extends Component {
  state = {
    activeFilter: 'All Positions'
  }

  filterClickHandler = (position) => {
    this.setState({ activeFilter: position })
  }

  render () {
    return (
      <div className={styles.findPlayers}>
        <h1 className={styles.header}>Sherpa Players</h1>
        <FilterBar
          clicked={this.filterClickHandler}
          active={this.state.activeFilter}
        />
        <PlayerSuggestions data={playerData}/>
      </div>
    )
  }
}

export default FindPlayers
