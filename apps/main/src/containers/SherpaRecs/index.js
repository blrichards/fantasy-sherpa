import React, { Component } from 'react'
import { connect } from 'react-redux'

import FilterBar from '../../components/FilterBar'
import PlayerSuggestions from '../../components/PlayerSuggestions'
import styles from './styles.styl'

// const playerData = [
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
//   { name: 'Player One', position: 'NA', ranking: 'NA', rating: 5, projected: 10.5 },
// ]

class SherpaRecs extends Component {
  state = {
    activeFilters: new Set(['Select All'])
  }

  filterClickHandler = (position) => {
    const { activeFilters } = this.state

    if (position === 'Select All') {
      activeFilters.clear()
      activeFilters.add('Select All')
    } else if (activeFilters.has(position))
      activeFilters.delete(position)
    else
      activeFilters.add(position)

    this.setState({ activeFilters })
  }

  isActiveHandler = (position) => {
    if (position === 'All')
      return this.state.activeFilters.length === 0
    return this.state.activeFilters.has(position)
  }

  render () {
    const data = this.props.data.filter(player => {
      return !this.state.activeFilters.has(player.position)
    })

    let suggestions = <PlayerSuggestions data={data}/>
    if (!data || !data.length) {
      suggestions = (
        <div className={styles.messageContainer}>
          <p className={styles.message}>Sorry!</p>
          <br/>
          <p className={styles.message}>We don't have any suggestions for you right now.</p>
          <p className={styles.message}>Try selecting more positions.</p>
        </div>
      )
    }

    return (
      <div className={styles.findPlayers}>
        <h1 className={styles.header}>Recommendations</h1>
        <FilterBar
          clicked={this.filterClickHandler}
          active={this.isActiveHandler}
        />
        {suggestions}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.user.recommendations,
  }
}

export default connect(mapStateToProps)(SherpaRecs)
