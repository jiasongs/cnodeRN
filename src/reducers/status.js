import * as types from '../constants/actionTypes'

const initStatus = {
  loadStatus: false
}
const changeLoadStatus = (state = initStatus, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loadStatus: types.LOADING
      }
    default:
      return state;
  }
}
export default changeLoadStatus