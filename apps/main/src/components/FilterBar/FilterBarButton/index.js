import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.styl'

const FilterBarButton = props => {
  let buttonStyles = [styles.button]
  if (!props.active)
    buttonStyles.push(styles.inactive)

  return (
    <button className={buttonStyles.join(' ')} onClick={props.clicked}>
      {props.text}
    </button>
  )
}
FilterBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

export default FilterBarButton
