import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import {createLogger} from 'redux-logger'

export default function configureStore (initialState = {}) {
  const middleware = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
      collapsed: true,
      logger: console,
      level: {
        prevState: 'debug',
        action: 'debug',
        nextState: 'debug',
        error: 'error'
      }
    }))
  }

  // const enhancers = [applyMiddleware(...middleware)]
  // const store = createStore(rootReducer, initialState, compose(...enhancers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())

  let composeEnhancers = null
  if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  } else {
    composeEnhancers = compose
  }

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
  ))

  // For hot reloading of react components and debugging
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
