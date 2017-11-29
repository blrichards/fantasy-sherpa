import { takeLatest } from 'redux-saga/effects'

/** APIs **/

import api from '../services/sherpa'

/** Types **/

import { StartupTypes } from '../redux/StartupRedux'

/** Sagas **/

import { startup } from './StartupSagas'

/** Connect Types to Sagas **/
export default function* root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
  ]
}
