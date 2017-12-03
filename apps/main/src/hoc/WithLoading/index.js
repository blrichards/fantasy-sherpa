import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import Loader from 'halogen/GridLoader'
// import { Loader } from 'react-loaders'
import {HashLoader} from 'react-spinners'

import styles from './styles.styl'
import Modal from '../Modal'

const WithLoading = (props) => {
  if (!props.loading)
    return props.children

  const {message} = props
  return (
    <Modal
      show
      component={
        <div className={styles.container}>
          <HashLoader color="#3FA2F7" loading={props.loading}/>
          <p className={styles.message}>{message}</p>
        </div>
      }
    >
      {props.children}
    </Modal>
  )
}
WithLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    message: state.user.message
  }
}

export default connect(mapStateToProps)(WithLoading)
