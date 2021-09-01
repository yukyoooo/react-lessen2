import React from "react";
import PostForm from "./PostForm";
import Tweet from "./tweet.js";
import { connect } from "react-redux";
import { deleteTweet } from '../Actions.js'

function saveTweets(tweets){
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
class Timeline extends React.Component {

  //componentのpropsが更新された時に呼び出す処理
  componentDidUpdate(){
    saveTweets(this.props.tweets);
  }

  render() {
    return (
      <div className="Timeline">
        <PostForm />
        <div>
          {this.props.tweets.map((tweet, index) => {
            return (
              <Tweet key={index} tweet={tweet} onDelete={this.props.deleteTweet} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tweets: state.tweets,
  }
};
const mapDispatch = (dispatch) => {
  return {
    deleteTweet: (tweet) =>{
      dispatch(deleteTweet(tweet));
    },
  }
}

export default connect(mapState, mapDispatch)(Timeline);
