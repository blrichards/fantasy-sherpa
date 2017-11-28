
const setUser = (user = null) => {
  return {
    type: 'SET_USER',
    user,
  }
}

export const UserActions = {
  setUser
}
