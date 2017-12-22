import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../reducers/index'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent
const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
})

let middlewares = [
  thunkMiddleware,
  logger
]

const configureStore = (initialState) => {
  const store = applyMiddleware(...middlewares)(createStore)(reducers, initialState)

  return store
}
export default configureStore
