import React from 'react'

import globalStyles from '../../index.styl'
import styles from './styles.styl'
import * as SocialIcons from '../../svg/social'

const Footer = () => (
  <div className={styles.Footer}>
    <p className={globalStyles.TextBody}>© 2017 Fantasy Sherpa</p>
    <div className={styles.Social}>
      <SocialIcons.GooglePlus/>
      <SocialIcons.Facebook/>
      <SocialIcons.Twitter/>
      <SocialIcons.Instagram/>
      <SocialIcons.Behance/>
    </div>
  </div>
)

export default Footer
