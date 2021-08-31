import React from "react";
import PostForm from "./PostForm";
import Tweet from "./tweet.js";
import { connect } from "react-redux";

function saveTweets(tweets){
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
class Timeline extends React.Component {
  state = {
    date: new Date(),
    timeId: 0,
  };

  //componentのpropsが更新された時に呼び出す処理
  componentDidUpdate(){
    saveTweets(this.props.tweets);
  }

  //componentを呼び出した直後に呼び出す処理
  componentDidMount() {
    const timeId = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
    this.setState({
      timeId: timeId,
    });
  }

  //componentを除する直前に呼び出す処理
  componentWillUnmount() {
    clearInterval(this.state.timeId);
  }

  handleSubmit = (newTweet) => {
    this.props.dispatch({ type: 'ADD_TWEET', payload: newTweet });
  };

  handleDelete = (tweet) => {
    this.props.dispatch({ type: 'DELETE_TWEET', payload: tweet });
  };

  render() {
    return (
      <div className="Timeline">
        <PostForm onSubmit={this.handleSubmit} />
        <div>
          {this.state.date.toLocaleString()}
          {this.props.tweets.map((tweet, index) => {
            return (
              <Tweet key={index} tweet={tweet} onDelete={this.handleDelete} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
  };
};

export default connect(mapStateToProps)(Timeline);
