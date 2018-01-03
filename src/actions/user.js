import * as userService from '../services/userService'
import * as types from '../constants/actionTypes';


export const loading = (loading) => {
  return {
    type: types.USER_INFO_LOADING,
    loading
  }
}

export const userInfo = (data) => {
  return {
    type: types.USER_INFO,
    data
  }
}
export const userRecently = (data) => {
  return {
    type: types.USER_RECENTLY,
    data
  }
}
export const userFavorites = (data) => {
  return {
    type: types.USER_FAVORITES,
    data
  }
}
export const getUserInfo = (query) => {
  return (dispatch) => {
    console.log('query')
    console.log(query)
    dispatch(userService.getUserInfo(query))
  }
}
export const getUserRecently = (query) => {
  return (dispatch) => {
    console.log('query')
    console.log(query)
    dispatch(userService.getUserRecently(query))
  }
}
export const getUserFavorites = (query) => {
  return (dispatch) => {
    dispatch(userService.getUserFavorites(query))
  }
}