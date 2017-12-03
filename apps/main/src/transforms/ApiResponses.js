
export const flattenTo = (object, stopAt) => {
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
