import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { PlayerSvg, StarSvg } from './svg'
import './styles.css'

export default class PlayerCard extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    ranking: PropTypes.string.isRequired,
    projected: PropTypes.number.isRequired,
    playerName: PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
    }

    this.stars = []
    for (let i = 0; i < Math.min(this.props.rating, 5); i++) {
      this.stars.push(
        <div className="PlayerCard-star" key={i}>
          <StarSvg/>
        </div>,
      )
    }
  }

  toggle () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const {
      position,
      playerName,
      ranking,
      projected,
    } = this.props

    const { expanded } = this.state

    return (
      <Panel
        bsClass="PlayerCard"
        header={
          <div>
            <div
              onClick={this.toggle.bind(this)}
              className="PlayerCard-header"
              style={{ borderBottom: expanded ? null : 'none' }}
            >
              <div className="PlayerCard-header-info">
                <p className="component-text">{playerName}</p>
                <p className="component-text-body">Position: {position}</p>
              </div>
              <PlayerSvg/>
            </div>
          </div>
        }
        collapsible
        expanded={expanded}
      >
        <div className="PlayerCard-content"
             style={{ display: expanded ? null : 'none' }}>
          <div className="PlayerCard-content-info">
            <div className="PlayerCard-content-info-section">
              <p className="component-text-body">Ranking</p>
              <div>
                <p className="component-text-big-value">{ranking}</p>
              </div>
            </div>
            <div className="PlayerCard-content-info-projected">
              <p className="component-text-body">Projected</p>
              <div>
                <p className="component-text-big-value">{projected.toFixed(
                  1)}</p>
              </div>
            </div>
          </div>
          <div className="PlayerCard-rating">
            {this.stars}
          </div>
        </div>
      </Panel>
    )
  }
}