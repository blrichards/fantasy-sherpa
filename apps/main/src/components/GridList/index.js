import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.styl'


const GridList = (props) => {
  return (
    <div className={styles.gridList}>
      {props.data.map((item, index) => props.initItem(item, index))}
    </div>
  )
}
GridList.propTypes = {
  initItem: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default GridList
