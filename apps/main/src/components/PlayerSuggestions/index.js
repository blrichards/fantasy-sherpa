import React from 'react'
import PropTypes from 'prop-types'

import PlayerCard from './PlayerCard'
import GridList from '../GridList'

const initPlayerCard = (player, index) => (
  <PlayerCard
    rating={player.rating}
    position={player.position}
    ranking={player.ranking}
    projected={player.projected}
    playerName={player.name.full}
    url={player.url}
    key={index}
  />
)

const PlayerSuggestions = (props) => {
  return (
    <GridList
      initItem={initPlayerCard}
      data={props.data}
    />
  )
}
PlayerSuggestions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number,
    position: PropTypes.string,
    ranking: PropTypes.string,
    projected: PropTypes.number,
    name: PropTypes.shape({
      full: PropTypes.string
    }).isRequired,
  })).isRequired
}

export default PlayerSuggestions
