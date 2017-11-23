import React, { Component } from 'react'

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
  render () {
    return (
      <div className={styles.myTeam}>
        <h1 className={styles.header}>Team</h1>
        <Team data={team}/>
      </div>
    )
  }
}

export default MyTeam
