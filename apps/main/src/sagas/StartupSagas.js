import {put, call} from 'redux-saga/effects'
import {UserActions} from '../redux/UserRedux'

function findVals(data, key, buf) {
  if (typeof data !== 'object')
    return

  Object.keys(data).some(x => {
    if (x === key)
      buf.push(data[x])
    else
      findVals(data[x], key, buf)
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

function getNflGameKeys(data) {
  // flatten json data
  const flattened = flattenTo(data, key => key === 'game')
  // filter by subtrees with the 'game' key
  const games = Object.keys(flattened).reduce((buf, key) => {
    if (/\bgame\b/.test(key))
      buf.push(flattened[key])
    return buf
  }, [])
  // reduce to keys with code 'nfl'
  return Object.keys(games).reduce((buf, key) => {
    const {'0': extraLevel, code: code0, game_key: gameKey0} = games[key]
    if (extraLevel) {
      const {code: code1, game_key: gameKey1} = extraLevel
      if (code1 === 'nfl')
        buf.push(gameKey1)
    } else if (code0 === 'nfl') {
      buf.push(gameKey0)
    }
    return buf
  }, [])
}

function getLeagueKeys(data) {
  // flatten json data
  const flattened = flattenTo(data, key => false)
  // get values for each key that ends in league_key
  return Object.keys(flattened).reduce((buf, key) => {
    if (/\bleague_key\b/.test(key))
      buf.push(flattened[key])
    return buf
  }, [])
}

export function* startup(api) {
  yield put(UserActions.setFetching(true))
  const {ok, data} = yield call(api.getGames)
  if (!ok) {
    console.tron.error('error fetching games')
    return null
  }
  const gameKeys = getNflGameKeys(data)
  const leagues = yield call(api.getLeagues, gameKeys)
  if (!leagues.ok) {
    console.tron.error('error fetching games')
    return null
  }
  console.tron.log(leagues.data)
  const leagueKeys = getLeagueKeys(leagues.data)
  console.tron.log(leagueKeys)

  yield put(UserActions.setFetching(false))
}
