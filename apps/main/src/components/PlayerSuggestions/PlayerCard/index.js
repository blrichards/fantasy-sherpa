import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import styles from './styles.styl'
import { Placeholder, Star } from '../../../svg/misc'

export default class PlayerCard extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    ranking: PropTypes.string.isRequired,
    projected: PropTypes.string.isRequired,
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
          <Star/>
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
      status,
      url,
    } = this.props

    const { expanded } = this.state

    let headshot = <Placeholder width={50} height={50}/>
    if (url) {
      const Image = styled.div`
        background: url(${url}) no-repeat top center;
        background-color: #E4F1FD;
        height: 50px;
        width: 50px;
        border-radius: 50px;
      `
      headshot = <Image/>
    }

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
              {headshot}
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
              <p className={styles.TextBody}>Status</p>
              <div>
                <p className={styles.TextBigValue}>{status}</p>
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
