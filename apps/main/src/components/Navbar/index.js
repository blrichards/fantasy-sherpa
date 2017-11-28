import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
        <img />
        <a href='/auth/logout'
           className={[Button, styles.LogoutButton].join(' ')}>
          <p className={styles.Text}>Logout</p>
        </a>
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps)(withRouter(Navbar))
