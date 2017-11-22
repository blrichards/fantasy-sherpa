import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.styl'

const NavbarButton = props => {
  const buttonStyle = [styles.Button]
  if (props.route === props.path)
    buttonStyle.push(styles.active)
  return (
    <Link to={props.route} className={buttonStyle.join(' ')}>
        <p className={styles.Text}>{props.text}</p>
    </Link>
  )
}

export default NavbarButton
