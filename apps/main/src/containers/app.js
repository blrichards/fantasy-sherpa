import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

import MyTeam from './MyTeam'
import FindPlayers from './FindPlayers'
import './styles.css'
import * as SocialIcons from './svg'

const NavBarButton = props => {
  const className = `component-text${props.path === props.route ? '' : '-body'}`
  return (
    <div className='Button NavBar-button'>
      <Link to={props.route} className={className}>
        <p>{props.text}</p>
      </Link>
    </div>
  )
}

const NavBar = withRouter(props => {
  return (
    <div>
      <div id='NavBar'>
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
        <div className='Button Logout NavBar-button'>
          <a href='/auth/logout' className='component-text-body'>
            <p>Logout</p>
          </a>
        </div>
      </div>
    </div>
  )
})

const Footer = () => (
  <div id='Footer'>
    <p className='component-text-body'>© 2017 Fantasy Sherpa</p>
    <div id='Social'>
      <SocialIcons.GooglePlus />
      <SocialIcons.Facebook />
      <SocialIcons.Twitter />
      <SocialIcons.Instagram />
      <SocialIcons.Behance />
    </div>
  </div>
)

const App = (props) => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={MyTeam}/>
      <Route path="/players" component={FindPlayers}/>
      <footer>
        <Footer />
      </footer>
    </div>
  </Router>
)

export default App
