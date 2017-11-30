import {put, call} from 'redux-saga/effects'
import {UserActions} from '../redux/UserRedux'

export function* startup(api) {
  // Start loading spinner
  yield put(UserActions.setFetching(true))

  // Fetch league data and store in redux
  try {
    const leagues = yield call(fetchLeagues, api)
    yield put(UserActions.setLeagues(leagues))
  } catch (e) {
    console.tron.error(e)
  }

  // Stop loading spinner
  yield put(UserActions.setFetching(false))
}

//////////////////////////////
//     Helper functions     //
//////////////////////////////

function *fetchLeagues(api) {
  // Call API
  const { ok, problem, data } = yield call(api.getLeagues)
  if (!ok)
    throw new Error(problem)

  // flatten json data
  const flattened = flattenTo(data, key => key === 'league')

  // get info for all leagues
  return Object.keys(flattened).reduce((buf, key) => {
    if (key.endsWith('league'))
      buf.push(flattened[key]['0'])
    return buf
  }, []).sort((a, b) => {
    // Sort by league key in reverse order
    return a['league_key'].localeCompare(b['league_key']) * -1
  })
}

const flattenTo = (object, stopAt) => {
  return Object.assign({}, ...function _flatten(objectBit, path = '') {  //spread the result into our return object
    return [].concat(                                                    //concat everything into one level
      ...Object.keys(objectBit).map(                                     //iterate over object
        key => (!stopAt(key) && typeof objectBit[key] === 'object') ?   //check if there is a nested object and if at right depth
          _flatten(objectBit[key], `${ path }/${ key }`) :               //call itself if there is
          ({[`${ path }/${ key }`]: objectBit[key]})                     //append object with it’s path as key
      )
    )
  }(object))
}
