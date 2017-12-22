import * as requestService from './request'
import * as topic from '../actions/topic';
import * as status from '../actions/status';

export const getTopicsByTab = (tab = 'all', params = {
  page: 1,
  limit: 20,
}) => {
  var tabType = tab
  return (dispatch) => {
    dispatch(topic.loading(tab, true))
    requestService.get('/topics', {
      tab,
      ...params
    }).then((data) => {
      dispatch(topic.topicsByTab(tabType, data.data))
    }).catch((error) => {
    }) // 
  }
}
export const updateTopicsByTab = (tab = 'all', params = {
  page: 1,
  limit: 20,
}) => {
  var tabType = tab
  return (dispatch) => {
    dispatch(topic.loading(tab, true))
    requestService.get('/topics', {
      tab,
      ...params
    }).then((data) => {
      dispatch(topic.moreTopicsByTab(tabType, data.data))
    }).catch((error) => {
    }) // 
  }
}

