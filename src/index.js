import React from 'react';
import reactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './index.css';
import EventsIndex from './components/events_index';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk))

reactDom.render(
  <Provider store={store}>
    <EventsIndex />
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
