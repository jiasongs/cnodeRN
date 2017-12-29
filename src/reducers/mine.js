import * as types from '../constants/actionTypes'

const initialState = {
  user: {},
  isLogin: false, // 是否登录
  loading: false
}

const mineState = (state = initialState, action) => {
  switch (action.type) {
    case types.GO_TO_LOGIN:
      var data = action.data
      if (data.success) {
        action.func(true)
      } else {
        action.func(false)
      }
      return {
        ...state,
        user: data.success ? data : {},
        isLogin: data.success ? true : false,
        loading: false,
      }
    case types.EXIT_LOGIN:
      return {
        ...state,
        isLogin: false,
        loading: false
      }
    case types.LOGIN_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}
export default mineState