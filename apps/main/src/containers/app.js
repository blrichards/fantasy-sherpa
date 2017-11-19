import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

import MyTeam from './MyTeam'
import FindPlayers from './FindPlayers'
import styles from './styles.css'
import globalStyles from '../index.css'
import * as SocialIcons from './svg'

const NavBarButton = props => {
  const className = props.path === props.route ?
    globalStyles.Text :
    globalStyles.TextBody
  return (
    <div className={[styles.Button, styles.NavButton].join(' ')}>
      <Link to={props.route} className={className}>
        <p>{props.text}</p>
      </Link>
    </div>
  )
}

const NavBar = withRouter(props => {
  const { Button, Logout, NavButton } = styles
  return (
    <div>
      <div className={styles.Nav}>
        <NavBarButton
          path={props.location.pathname}
          route='/'
          text='My Team'
        />
        <NavBarButton
          path={props.location.pathname}
          route='/players'
          text='Find Players'
        />
        <div className={[Button, NavButton, Logout].join(' ')}>
          <a href='/auth/logout' className={globalStyles.TextBody}>
            <p>Logout</p>
          </a>
        </div>
      </div>
    </div>
  )
})

const Footer = () => (
  <div className={styles.Footer}>
    <p className={globalStyles.TextBody}>© 2017 Fantasy Sherpa</p>
    <div className={styles.Social}>
      <SocialIcons.GooglePlus/>
      <SocialIcons.Facebook/>
      <SocialIcons.Twitter/>
      <SocialIcons.Instagram/>
      <SocialIcons.Behance/>
    </div>
  </div>
)

const App = (props) => (
  <Router>
    <div>
      <NavBar/>
      <Route exact path="/" component={MyTeam}/>
      <Route path="/players" component={FindPlayers}/>
      <footer>
        <Footer/>
      </footer>
    </div>
  </Router>
)

export default App
