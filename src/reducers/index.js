import { combineReducers } from 'redux'
import getTopics from './topic';
import getDetail from './detail';
import getSearchTopics from './find';
import mineState from './mine';
export default combineReducers({
  getTopics,
  getDetail,
  getSearchTopics,
  mineState
}) 