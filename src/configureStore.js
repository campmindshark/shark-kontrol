/* @flow */

import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';

import type { Store } from './types';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default (history: Object, initialState: Object = {}): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    thunk.withExtraArgument(axios),
    sagaMiddleware,
    routerMiddleware(history)
  ];
  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares)
    // Add other enhancers here
  );
  const store = createStore(rootReducer, initialState, enhancers);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`==> 😭  ReduxState hot reloading error ${error}`);
      }
    });
  }

  return store;
};
