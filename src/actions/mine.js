import * as types from '../constants/actionTypes';
import * as loginService from '../services/loginService'

export const loading = (loading) => {
  return {
    type: types.LOGIN_LOADING,
    loading
  }
}
export const gotoLogin = (data, func) => {
  return {
    type: types.GO_TO_LOGIN,
    data,
    func
  }
}
export const exitLogin = (data) => {
  return {
    type: types.EXIT_LOGIN,
    data
  }
}
export const sendLogin = (body, func) => {
  return (dispatch) => {
    dispatch(loginService.sendLogin(body, func))//登录接口
  }
}