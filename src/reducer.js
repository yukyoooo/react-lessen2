import { ADD_TWEET, DELETE_TWEET, EDIT_VALUE, RESET } from "./Actions";
import {combineReducers} from 'redux';

function loadTweets() {
  try {
    const tweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    for (const tweet of tweets) {
      tweet.ts = new Date(tweet.ts);
    }
    return tweets;
  } catch {
    return {};
  }
}

const INITIAL_EMOJI_LIST = [
  "😄", 
  "😈", 
  "👻", 
  "👀", 
  "🐔"
];

const initialUser = { name: 'ぽけぽけ'};
const user = (state = initialUser, action) => {
  return state;
}

const emojiList = (state = INITIAL_EMOJI_LIST, action) => {
  return state;
}

const initialState = {
  user_name: "ぽけぽけ",
  emojiList,
  tweets: loadTweets(),
  form: {
    text: "",
    avatar: null,
  },
};

const initialTweets = loadTweets();
const tweets = (state = initialTweets, action) => {
  switch (action.type) {
    case ADD_TWEET:
      return [action.payload, ...state];
    case DELETE_TWEET:
      return state.filter(o => action.payload.ts !== o.ts);
    default:
      return state;
  }
};

const initialForm = { text: '', avatar: null };
const form = (state = initialForm, action) => {
  switch(action.type){
    case EDIT_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case RESET:
      return initialForm;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  emojiList,
  tweets,
  form,
});