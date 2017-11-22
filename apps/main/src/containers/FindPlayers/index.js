import React, { Component } from 'react'
import { observer } from 'mobx-react'

import FilterBar from './FilterBar'
import styles from './styles.styl'
// import PlayerCard from '../../components/PlayerCard'

@observer
class FindPlayers extends Component {

  state = {
    activeFilter: 'All Positions'
  }

  filterClickHandler = (position) => {
    this.setState({ activeFilter: position })
  }

  render () {
    return (
      <div className={styles.FindPlayers}>
        <h1 className={styles.Header}>Sherpa Players</h1>
        <FilterBar
          clicked={this.filterClickHandler}
          active={this.state.activeFilter}
        />
        <p>Content</p>
      </div>
    )
  }
}

export default FindPlayers
