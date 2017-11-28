import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import Aux from '../hoc/Aux'
import Layout from '../hoc/Layout'
import MyTeam from './MyTeam'
import FindPlayers from './FindPlayers'
import { UserActions } from '../actions/user'

class App extends Component {
  async componentDidMount() {
    const { status, data = {}} = await axios.get('/user')
    if (status === 200) {
      this.props.setUser(data.user)
    } else
      console.log(data.error)
  }

  render () {
    return (
      <Aux>
        <BrowserRouter>
          <Layout>
            <Route exact path="/" component={MyTeam}/>
            <Route path="/players" component={FindPlayers}/>
          </Layout>
        </BrowserRouter>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(UserActions.setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
