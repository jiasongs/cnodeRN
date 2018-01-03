import * as types from '../constants/actionTypes'

// const { storage } = global.storage
const initialState = {
  recently: { recent_replies: [], recent_topics: [] },
  userInfo: {},
  favorites: [],
  loading: false,
}

const userInfo = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case types.USER_INFO:
      return {
        ...state,
        userInfo: action.data,
        loading: false
      }
    case types.USER_RECENTLY:
      return {
        ...state,
        recently: action.data,
        loading: false
      }
    case types.USER_FAVORITES:
      return {
        ...state,
        favorites: action.data,
        loading: false
      }
    case types.USER_INFO_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}
export default userInfo