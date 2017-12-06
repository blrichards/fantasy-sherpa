import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import WithLoading from '../hoc/WithLoading'
import Model from '../hoc/Modal'
import SelectLeague from '../components/SelectLeague'
import Layout from '../hoc/Layout'
import MyTeam from './MyTeam'
import FindPlayers from './SherpaRecs'
import {baseUrl} from '../config'
import {StartupActions} from '../redux/StartupRedux'

class App extends Component {
  componentDidMount() {
    this.props.startup()
  }

  render() {
    const content = (
      <BrowserRouter>
        <Layout>
          <Route exact path={`${baseUrl}/`} component={MyTeam}/>
          <Route path={`${baseUrl}/players`} component={FindPlayers}/>
        </Layout>
      </BrowserRouter>
    )

    if (this.props.loading) {
      return (
        <WithLoading loading={this.props.loading}>
          {content}
        </WithLoading>
      )
    }

    return (
      <Model show={!this.props.league} component={<SelectLeague/>}>
        {content}
      </Model>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.fetching,
    league: state.user.league,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
