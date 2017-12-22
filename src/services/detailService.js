import * as requestService from './request'
import * as detail from '../actions/detial';
import * as status from '../actions/status';

export const getDetailById = (id, params = {
  accesstoken: '',
}) => {
  return (dispatch) => {
    dispatch(status.loading(true))
    var url = '/topic/' + id
    requestService.get(url, {
      ...params
    }).then((data) => {
      dispatch(detail.topicById(data.data))
    }).catch((error) => {
    }) // 
  }
}
// export const updateTopicsByTab = (tab = 'all', params = {
//   page: 1,
//   limit: 20,
// }) => {
//   var tabType = tab
//   return (dispatch) => {
//     dispatch(topic.loading(tab, true))
//     requestService.get('/topics', {
//       tab,
//       ...params
//     }).then((data) => {
//       dispatch(topic.moreTopicsByTab(tabType, data.data))
//     }).catch((error) => {
//     }) // 
//   }
// }

