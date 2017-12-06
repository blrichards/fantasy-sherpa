import React from 'react'
import {connect} from 'react-redux'

import Aux from '../../hoc/Aux'
import {UserActions} from '../../redux/UserRedux'
import styles from './styles.styl'

const SelectLeague = (props) => {
  if (!props.leagues.length) {
    return (
      <div className={styles.container}>
        <p className={styles.prompt} style={{ fontWeight: 'bold', marginBottom: 20 }}>
          I'm sorry
        </p>
        <p className={styles.prompt}>
          It looks like you don't have any leagues to choose from. <span role="img" aria-label="sad">🙁</span>
        </p>
        <p className={styles.prompt}>
          Sign up for <a className={styles.link} href="https://football.fantasysports.yahoo.com">
            <em>
            Yahoo! Fantasy Football
            </em>
          </a> and come back to join us! <span role="img" aria-label="100">💯</span>
        </p>
      </div>
    )
  }

  let currentSeason = null
  const options = props.leagues.map((league, index) => {
    const onClick = () => props.initLeague(index)
    if (league.season !== currentSeason) {
      currentSeason = league.season
      return (
        <Aux>
          <div className={styles.leagueYear}>
            {league.season}
          </div>
          <div className={styles.league} onClick={onClick}>{league.name}</div>
        </Aux>
      )
    }
    return (
      <div className={styles.league} onClick={onClick}>{league.name}</div>
    )
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.selectHeader}>select a league</h1>
      <div className={styles.leagues}>
        {options}
      </div>
    </div>
  )
}

const matchStateToProps = (state) => {
  return {
    leagues: state.user.leagues
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    initLeague: (index) => dispatch(UserActions.initLeague(index))
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(SelectLeague)
