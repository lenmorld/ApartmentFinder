// import 'babel-polyfill';  // polyfill for backwards-compatible
import React from 'react';
import ReactDOM from "react-dom";
// store
import {createStore, applyMiddleware, compose} from 'redux';
// reducers
// import rootReducer from './reducers';
// Provider
import {Provider} from 'react-redux';
// components
import App from './containers/App';

// middleware
import appMiddleware from './middleware';
import rootReducer from './reducers';


// create Store from combined reducers results JSON
// const store = createStore(allReducers);
const finalCreateStore = compose(
    applyMiddleware(appMiddleware)
)(createStore);

const store = finalCreateStore(rootReducer);


// use provider, which makes Store data available to all components
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);


// regular React, render component
// ReactDOM.render(
//   <App />, document.getElementById('root')
// );



// ReactDOM.render(
//   <h1>Hey Now</h1>, document.getElementById('root')
// );
