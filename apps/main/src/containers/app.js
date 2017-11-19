import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyTeam from './MyTeam'
import FindPlayers from './FindPlayers'

const App = (props) => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Route exact path="/" component={MyTeam}/>
      <Route path="/players" component={FindPlayers}/>
      <Footer />
    </div>
  </BrowserRouter>
)

export default App
