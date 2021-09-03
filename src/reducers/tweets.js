import { ADD_TWEET, DELETE_TWEET } from "../Actions";


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

export default tweets;