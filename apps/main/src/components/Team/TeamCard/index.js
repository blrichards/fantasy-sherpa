import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import styles from './styles.styl'
import { Placeholder } from '../../../svg/misc'

const TeamCard = (props) => {
  let headshot = <Placeholder width={50} height={50}/>
  if (props.url) {
    const Image = styled.div`
      background: url(${props.url}) no-repeat top center;
      background-color: #E4F1FD;
      height: 50px;
      width: 50px;
      border-radius: 50px;
    `
    headshot = <Image/>
  }
  // if (props.url)
  //     headshot = <div className={styles.headshot} style={{ backgroundImage: `url(${props.url})`, backgroundPosition: 'center' }}/>
  return (
    <div className={styles.teamCard}>
      {headshot}
      <div className={styles.right}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.position}>{props.position}</p>
      </div>
    </div>
  )
}
TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  url: PropTypes.string,
}

export default TeamCard
