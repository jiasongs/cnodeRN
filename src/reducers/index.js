import { combineReducers } from 'redux'
import getTopics from './topic';
import getDetail from './detail';
import getSearchTopics from './find';
export default combineReducers({
  getTopics,
  getDetail,
  getSearchTopics
}) 