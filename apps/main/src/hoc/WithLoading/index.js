import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { DotLoader as Loader } from 'halogen'

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
          <Loader color="#3FA2F7" size='86px' margin='50px' loading={props.loading}/>
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
