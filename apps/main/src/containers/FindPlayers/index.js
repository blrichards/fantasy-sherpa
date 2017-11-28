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
    activeFilters: []
  }

  filterClickHandler = (position) => {
    const { activeFilters } = this.state
    if (activeFilters.length === 0) {
      if (position !== 'All Positions')
        this.setState({ activeFilters: [position] })
    } else if (position === 'All Positions') {
      this.setState({ activeFilters: [] })
    } else {
      this.setState(prevState => {
        const state = { activeFilters: [...prevState.activeFilters, position] }
        if (state.activeFilters.length === 6)
          state.activeFilters = []
        return state
      })
    }
  }

  isActiveHandler = (position) => {
    if (position === 'All Positions')
      return this.state.activeFilters.length === 0
    return this.state.activeFilters.find((p) => p === position) !== undefined
  }

  render () {
    return (
      <div className={styles.findPlayers}>
        <h1 className={styles.header}>Sherpa Players</h1>
        <FilterBar
          clicked={this.filterClickHandler}
          active={this.isActiveHandler}
        />
        <PlayerSuggestions data={playerData}/>
      </div>
    )
  }
}

export default FindPlayers
