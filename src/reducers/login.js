import * as types from '../constants/actionTypes'

// const { storage } = global.storage
const initialState = {
  user: {},
  isLogin: false, // 是否登录
  loading: false
}

const loginState = (state = initialState, action) => {
  switch (action.type) {
    case types.GO_TO_LOGIN:
      var data = action.data
      console.log('global.storage')
      console.log(data)
      if (data.success) {
        global.storage.save({
          key: types.LOGIN_STATE,
          data: {
            token: action.body.accesstoken,
            user: data
          },
          expires: null
        })
        action.func(true, data)
      } else {
        action.func(false, {})
      }
      return {
        ...state,
        user: data.success ? data : {},
        isLogin: data.success ? true : false,
        loading: false,
      }
    case types.EXIT_LOGIN:
      global.storage.save({
        key: types.LOGIN_STATE,
        data: {
          token: '',
          user: {}
        },
        expires: null
      })
      return {
        ...state,
        user: {},
        isLogin: false,
        loading: false,
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
export default loginState