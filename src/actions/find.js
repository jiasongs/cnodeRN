import * as searchService from '../services/searchService'
import * as types from '../constants/actionTypes'

export const loading = (loading) => {
  return {
    type: types.SEARCH_LOADING,
    loading
  }
}

export const searchTopics = (payload) => {
  return {
    type: types.GET_SEARCH_TOPICS,
    payload,
  }
}
export const getSearchTopics = (params) => {
  return (dispatch) => {
    dispatch(searchService.getSearchTopics(params))
  }
}