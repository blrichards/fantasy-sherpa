import React from 'react'
import PropTypes from 'prop-types'
import { HashLoader } from 'react-spinners'

import styles from './styles.styl'
import Aux from '../Aux'

const WithLoading = (props) => {
  if (!props.loading)
    return props.children

  return (
    <Aux>
      <div className={styles.LoadingScreen}>
        <HashLoader color="#3FA2F7" loading={props.loading}/>
      </div>
      <div className={styles.Blur}>
        {props.children}
      </div>
    </Aux>
  )
}
WithLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default WithLoading
