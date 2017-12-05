import React, {Component} from 'react'
import {connect} from 'react-redux'

import Team from '../../components/Team'
import styles from './styles.styl'

const team = [
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
  {name: 'Player One', position: 'Position'},
]

class MyTeam extends Component {

  filterRosterPlayers = (player) => {
    return player.selectedPosition !== 'BN'
  }

  filterBenchPlayers = (player) => {
    return player.selectedPosition === 'BN'
  }

  render() {
    const { roster = team } = this.props
    return (
      <div className={styles.myTeam}>
        <h1 className={styles.header}>Lineup</h1>
        <Team data={roster} filter={this.filterRosterPlayers}/>
        <h1 className={styles.header}>Bench</h1>
        <Team data={roster} filter={this.filterBenchPlayers}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    roster: state.user.roster
  }
}

export default connect(mapStateToProps)(MyTeam)
