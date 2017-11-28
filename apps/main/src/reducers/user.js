import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  user: {}
})

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_USER':
    return state.merge({
      user: action.user
    })
  default:
    return state
  }
}

export default reducer
