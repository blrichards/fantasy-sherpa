import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.css'
import globalStyles from '../../../index.css'

const NavbarButton = props => {
  const className = props.path === props.route ?
    globalStyles.Text :
    globalStyles.TextBody
  return (
    <div className={styles.Button}>
      <Link to={props.route} className={className}>
        <p>{props.text}</p>
      </Link>
    </div>
  )
}

export default NavbarButton