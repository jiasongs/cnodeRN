import * as detailService from '../services/detailService'
import * as types from '../constants/actionTypes'


export const topicById = (payload) => {
  return {
    type: types.GET_TOPIC_BY_ID,
    payload,
  }
}

export const getTopicById = (id, params) => {
  return (dispatch) => {
    return dispatch(detailService.getDetailById(id, params))
  }
}
export const removeTopic = () => {
  return {
    type: types.REMOVE_TOPIC,
  }
}
// export const updateTopicsByTab = (tab, params) => {
//   return (dispatch) => {
//     return dispatch(topicService.updateTopicsByTab(tab, params))
//   }
// }
