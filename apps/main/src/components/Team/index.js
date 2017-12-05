import React from 'react'
import PropTypes from 'prop-types'

import TeamCard from './TeamCard'
import GridList from '../GridList'

const initItem = (player, index) => {
  return (
    <TeamCard
      name={player.name.full}
      position={player.position}
      url={player.url}
      key={index}
    />
  )
}

const Team = props => {
  const { filter } = props
  let data = props.data
  if (filter) {
    data = data.filter(filter)
  }

  return (
    <GridList
      initItem={initItem}
      data={data}
    />
  )
}

Team.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
  })).isRequired,
  filter: PropTypes.func,
}

export default Team
