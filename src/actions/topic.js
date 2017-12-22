import * as topicService from '../services/topicService'
import * as types from '../constants/actionTypes'

export const loading = (tab, loading) => {
  return {
    type: types.HOME_LOADING,
    tab,
    loading
  }
}
export const topicsByTab = (tab, payload) => {
  return {
    type: types.GET_TOPICS_BY_TAB,
    tab,
    payload,
  }
}
export const moreTopicsByTab = (tab, payload) => {
  return {
    type: types.MORE_TOPICS_BY_TAB,
    tab,
    payload,
  }
}

export const getTopicsByTab = (tab, params) => {
  return (dispatch) => {
    return dispatch(topicService.getTopicsByTab(tab, params))
  }
}
export const updateTopicsByTab = (tab, params) => {
  return (dispatch) => {
    return dispatch(topicService.updateTopicsByTab(tab, params))
  }
}
