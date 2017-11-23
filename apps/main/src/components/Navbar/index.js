import React from 'react'
import { withRouter } from 'react-router-dom'

import NavButton from './NavbarButton'
import { Button } from './NavbarButton/styles.styl'
import styles from './styles.styl'

const Navbar = props => {
  return (
    <div className={styles.Navbar}>
      <p className={styles.Logo}>fantasy sherpa</p>
      <nav className={styles.NavigationItems}>
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
          <a href='/auth/logout' className={styles.Text}>
            <p>Logout</p>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
