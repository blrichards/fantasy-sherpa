import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import WithLoading from '../hoc/WithLoading'
import Layout from '../hoc/Layout'
import MyTeam from './MyTeam'
import FindPlayers from './FindPlayers'
import { baseUrl } from '../config'
import { StartupActions } from '../redux/StartupRedux'

class App extends Component {
  componentDidMount () {
    this.props.startup()
  }

  render () {
    return (
      <WithLoading loading={this.props.loading}>
        <BrowserRouter>
          <Layout>
            <Route exact path={`${baseUrl}/`} component={MyTeam}/>
            <Route path={`${baseUrl}/players`} component={FindPlayers}/>
          </Layout>
        </BrowserRouter>
      </WithLoading>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
