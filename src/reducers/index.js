import { combineReducers } from 'redux'
import getTopics from './topic';
import getDetail from './detail';
import getSearchTopics from './find';
import loginState from './login';
import userInfo from './user';
import messageState from './message';
export default combineReducers({
  getTopics,
  getDetail,
  getSearchTopics,
  loginState,
  userInfo,
  messageState
}) 