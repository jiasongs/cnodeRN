import * as topicService from '../services/topicService'
import * as types from '../constants/actionTypes'
export const getTopicsByTab = () => {
  return {
    type: types.GET_TOPICS_BY_TAB,
    data: {}
  }
}