// combine all reducer data to one big JSON for Store

import {combineReducers} from 'redux';
// import UserReducer from './reducer-users';
import apartments from './apartments';
// import ActiveAptReducer from './reducer-active-apt';

const rootReducer = combineReducers({
  apartments,
  // activeUser: ActiveAptReducer
  // ,movies: MovieReducer
});

export default rootReducer;
