import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.styl'
import Aux from '../Aux'

const Modal = (props) => {
  if (!props.show)
    return props.children

  return (
    <Aux>
      <div className={styles.container}>
        {props.component}
      </div>
      <div className={styles.blur}>
        {props.children}
      </div>
    </Aux>
  )
}
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  component: PropTypes.node.isRequired,
}

export default Modal
