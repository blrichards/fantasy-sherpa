import React from 'react'

import Aux from '../Aux'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const Layout = props => (
  <Aux>
    <Navbar />
    {props.children}
    <Footer/>
  </Aux>
)