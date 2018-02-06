import * as types from '../constants/actionTypes'

const initialState = {
  loading: false,
  readMessage: [],
  unreadMessage: [],
}
const messageState = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case types.MESSAGE:
      return {
        ...state,
        readMessage: action.data.has_read_messages,
        unreadMessage: action.data.hasnot_read_messages,
        loading: false
      }
    case types.MESSAGE_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}
export default messageState