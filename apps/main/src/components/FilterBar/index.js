import React from 'react'
import PropTypes from 'prop-types'

import FilterBarButton from './FilterBarButton/index'
import styles from './styles.styl'

const positions = [
  'All Positions',
  'Quarterback',
  'Running Back',
  'Wide Receiver',
  'Tight End',
  'D/ST',
  'Kicker',
]

const FilterBar = props => {
  return (
    <div className={styles.filterBar}>
      {positions.map(position => (
        <FilterBarButton
          text={position}
          clicked={() => props.clicked(position)}
          key={position}
          active={position === props.active}
        />
      ))}
    </div>
  )
}
FilterBar.propTypes = {
  clicked: PropTypes.func.isRequired,
  active: PropTypes.string
}

export default FilterBar
