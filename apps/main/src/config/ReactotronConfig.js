import Reactotron from 'reactotron-react-js'
import apisaucePlugin from 'reactotron-apisauce'

import DebugConfig from './DebugConfig'



Reactotron
  .configure()
  .use(apisaucePlugin({ /* config */ }))
  .connect()

/**
 * Uncomment next line to clear the
 * reactotron timeline on reload
 */
Reactotron.clear()

if (DebugConfig.useReactotron)
  console.tron = Reactotron
else {
  console.tron = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    apisauce: null
  }
}

