import { takeLatest } from 'redux-saga/effects'

/** APIs **/

import api from '../services/sherpa'

/** Types **/

import { StartupTypes } from '../redux/StartupRedux'
import { UserTypes } from '../redux/UserRedux'

/** Sagas **/

import { startup } from './StartupSagas'
import { initLeague } from './UserSagas'

/** Connect Types to Sagas **/
export default function* root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(UserTypes.INIT_LEAGUE, initLeague, api)
  ]
}
