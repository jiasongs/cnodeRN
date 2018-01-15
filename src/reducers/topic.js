import * as types from '../constants/actionTypes'
import changeLoadStatus from './status';
const initialState = {
  all: [],
  good: [],
  share: [],
  ask: [],
  test: [],
  job: [],
  loading: {
    all: true,
    good: false,
    share: false,
    ask: false,
    job: false,
  }
}
console.log(types.GET_TOPICS_BY_TAB)
const getTopics = (state = initialState, action) => {
  var tab = action.tab
  switch (action.type) {
    case types.GET_TOPICS_BY_TAB:
      return {
        ...state,
        [tab]: action.payload,
        loading: {
          ...state.loading,
          [tab]: false
        }
      }
    case types.MORE_TOPICS_BY_TAB:
      return {
        ...state,
        [tab]: state[tab].concat(action.payload),
        loading: {
          ...state.loading,
          [tab]: false
        }
      }
    case types.HOME_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [tab]: action.loading
        }
      }
    default:
      return state;
  }
}

export default getTopics