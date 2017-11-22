import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'

import styles from './styles.styl'
import { PlayerSvg, StarSvg } from './svg'

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
      expanded: true,
    }

    this.stars = []
    for (let i = 0; i < Math.min(this.props.rating, 5); i++) {
      this.stars.push(
        <div className={styles.Star} key={i}>
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
        bsClass={styles.PlayerCard}
        header={
          <div>
            <div
              // onClick={this.toggle.bind(this)}
              className={styles.Header}
              style={{ borderBottom: expanded ? null : 'none' }}
            >
              <div className={styles.HeaderInfo}>
                <p className={styles.Text}>{playerName}</p>
                <p className={styles.TextBody}>Position: {position}</p>
              </div>
              <PlayerSvg/>
            </div>
          </div>
        }
        collapsible
        expanded={expanded}
      >
        <div className={styles.Content}
             style={{ display: expanded ? null : 'none' }}>
          <div className={styles.ContentInfo}>
            <div className={styles.ContentInfoSection}>
              <p className={styles.TextBody}>Ranking</p>
              <div>
                <p className={styles.TextBigValue}>{ranking}</p>
              </div>
            </div>
            <div className={styles.ContentInfoProjected}>
              <p className={styles.TextBody}>Projected</p>
              <div>
                <p className={styles.TextBigValue}>{projected.toFixed(
                  1)}</p>
              </div>
            </div>
          </div>
          <div className={styles.Rating}>
            {this.stars}
          </div>
        </div>
      </Panel>
    )
  }
}
