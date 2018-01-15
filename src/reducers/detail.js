import * as types from '../constants/actionTypes'

const initialState = {
  data: {},
  comment: [],
  loading: true
}
const getDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOPIC_BY_ID:
      if (action.payload && typeof (eval(action.func)) == "function") {
        action.func(true)
      } else {
        action.func(false)
      }
      return {
        ...state,
        data: action.payload,
        comment: action.payload.replies,
        loading: false
      }
    case types.REMOVE_TOPIC:
      return {
        ...state,
        data: {}
      }
    case types.LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}

export default getDetail