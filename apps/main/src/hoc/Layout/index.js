import React from 'react'

import Aux from '../Aux'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './styles.styl'

const Layout = props => (
  <Aux>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.content}>
        {props.children}
      </div>
      <Footer/>
    </div>
  </Aux>
)

export default Layout
