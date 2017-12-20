import * as requestService from './request'

export const getTopicsByTab = (tab = 'all', params = {}) => {
  return requestService.get('/topics', {
    tab,
    page: 1,
    limit: 40,
    ...params
  }).then(data.data)
}

