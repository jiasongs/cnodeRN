import * as types from '../constants/actionTypes';
import * as messageService from '../services/messageService'
export const loading = (loading) => {
  return {
    type: types.MESSAGE_LOADING,
    loading
  }
}
export const message = (data) => {
  return {
    type: types.MESSAGE,
    data
  }
}
export const getMessage = (parms) => {
  return (dispatch) => {
    dispatch(messageService.getMessage(parms))
  }
}
// export const readMessage = (data) => {
//   return {
//     type: types.READ_MESSAGE,
//     data  
//   }
// }
// export const unreadMessage = (data) => {
//   return {
//     type: types.UNREAD_MESSAGE,
//     data  
//   }
// }
