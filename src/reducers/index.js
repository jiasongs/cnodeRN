import { combineReducers } from 'redux'
import getTopics from './topic';
import getDetail from './detail';

export default combineReducers({
  getTopics,
  getDetail
}) 