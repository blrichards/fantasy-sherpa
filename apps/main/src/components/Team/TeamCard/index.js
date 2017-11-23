import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.styl'
import { Placeholder } from '../../../svg/misc'

const TeamCard = (props) => {
  return (
    <div className={styles.teamCard}>
      <Placeholder width={90} height={90}/>
      <div className={styles.right}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.position}>{props.position}</p>
      </div>
    </div>
  )
}
TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
}

export default TeamCard
