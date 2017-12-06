import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import NavButton from './NavbarButton'
import { Button } from './NavbarButton/styles.styl'
import { baseUrl } from '../../config'
import styles from './styles.styl'

const Navbar = props => {
  return (
    <div className={styles.Navbar}>
      <p className={styles.Logo}>fantasy sherpa</p>
      <nav className={styles.NavigationItems}>
        <NavButton
          path={props.location.pathname}
          route={`${baseUrl}/`}
          text='My Team'
        />
        <NavButton
          path={props.location.pathname}
          route={`${baseUrl}/players`}
          text='Sherpa Recs'
        />
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
