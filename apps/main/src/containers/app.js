import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from '../hoc/Layout'
import MyTeam from './MyTeam'
import FindPlayers from './FindPlayers'

const App = (props) => (
  <BrowserRouter>
    <Layout>
      <Route exact path="/" component={MyTeam}/>
      <Route path="/players" component={FindPlayers}/>
    </Layout>
  </BrowserRouter>
)

export default App
