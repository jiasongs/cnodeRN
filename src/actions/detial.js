import * as detailService from '../services/detailService'
import * as types from '../constants/actionTypes'


export const topicById = (payload, func) => {
  return {
    type: types.GET_TOPIC_BY_ID,
    payload,
    func
  }
}
export const removeTopic = () => {
  return {
    type: types.REMOVE_TOPIC,
  }
}
export const getTopicById = (id, params, func) => {
  return (dispatch) => {
    return dispatch(detailService.getDetailById(id, params, func))
  }
}

// export const updateTopicsByTab = (tab, params) => {
//   return (dispatch) => {
//     return dispatch(topicService.updateTopicsByTab(tab, params))
//   }
// }
