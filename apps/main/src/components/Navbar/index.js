import React from 'react'
import { withRouter } from 'react-router-dom'

import styles from './styles.css'
import globalStyles from '../../index.css'
import NavButton from './NavbarButton'
import { Button } from './NavbarButton/styles.css'

const Navbar = props => {
  return (
    <div>
      <div className={styles.Navbar}>
        <NavButton
          path={props.location.pathname}
          route='/'
          text='My Team'
        />
        <NavButton
          path={props.location.pathname}
          route='/players'
          text='Find Players'
        />
        <div className={[Button, styles.LogoutButton].join(' ')}>
          <a href='/auth/logout' className={globalStyles.TextBody}>
            <p>Logout</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Navbar)