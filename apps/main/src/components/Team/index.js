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
  return (
    <GridList
      initItem={initItem}
      data={props.data}
    />
  )
}
Team.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
  })).isRequired,
}

export default Team
