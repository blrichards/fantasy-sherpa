import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startup: null
})

export const StartupTypes = Types
export const StartupActions = Creators
