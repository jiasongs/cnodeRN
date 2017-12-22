import * as types from '../constants/actionTypes'

const initialState = {
  data: {},
  comment: [],
  loading: false
}
const getDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOPIC_BY_ID:
      return {
        ...state,
        data: action.payload,
        comment: action.payload.replies,
        loading: false
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