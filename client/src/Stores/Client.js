import { observable } from 'mobx'

export const ClientState = Object.freeze({
  DONE: Symbol('done'),
  FETCHING: Symbol('fetching'),
  ERROR: Symbol('error'),
})

export class Client {
  @observable state = ClientState.DONE
  error = null
}

export default new Client()