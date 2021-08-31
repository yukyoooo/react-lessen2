import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function loadTweets() {
  try{
    const tweets = JSON.parse(localStorage.getItem('tweets') || '[]');
    for (const tweet of tweets){
      tweet.ts = new Date(tweet.ts);
    }
    return tweets;
  } catch {
    return {};
  }
}

const initialState = {
  user_name: 'ぽけぽけ',
  tweets: loadTweets(),
};

// { type: 'ADD_TWEET', payload: tweet}
const reducer = (state, action) => {
  switch (action.type ){
    case 'ADD_TWEET':
      return {
        ...state,
        tweets: [ action.payload, ...state.tweets],
      };
    case 'DELETE_TWEET':
      return {
        ...state,
        tweets: state.tweets.filter(o => {
          return action.payload.ts !== o.ts;
        })
      };
    default:
      return state;
  };
};


const store = createStore(reducer, initialState);
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
