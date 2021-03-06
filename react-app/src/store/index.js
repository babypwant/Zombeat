import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import playlists from './playlists'
import timers from './timer'
import token from './spotify';
import current from './current';
import featured from './featured';
import selectedPlaylist from './selectedPlaylist';
import searched from './searched';
import saved from './saved';

const rootReducer = combineReducers({
  session,
  playlists,
  timers,
  token,
  current,
  featured,
  selectedPlaylist,
  searched,
  saved
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
