import * as types from '../constants/actionTypes'
const initialState = {
  data: [],
  loading: false
}

const getSearchTopics = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case types.GET_SEARCH_TOPICS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case types.SEARCH_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case types.REMOVE_SEARCH_TOPICS:
      return {
        ...state,
        data: [],
        loading: false
      }
    default:
      return state;
  }
}
export default getSearchTopics