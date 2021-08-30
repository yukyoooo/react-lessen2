import React from "react";
import PostForm from "./PostForm";
import Tweet from "./tweet.js";

class Timeline extends React.Component {
  state = {
    date: new Date(),
    aa: 10,
    timeId: -1,
    // ts: Date, message: string
    tweets: [],
  };

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
    const { tweets } = this.state;
    const newTweets = [newTweet, ...tweets];
    this.setState({ tweets: newTweets });
  };

  handleDelete = (tweet) => {
    const newTweet = this.state.tweets.filter((o) => {
      return tweet.ts !== o.ts;
    });
    this.setState({ tweets: newTweet });
  };

  render() {
    return (
      <div className="Timeline">
        <PostForm onSubmit={this.handleSubmit} />
        <div>
          {this.state.date.toLocaleString()}
          {this.state.tweets.map((tweet, index) => {
            return (
              <Tweet key={index} tweet={tweet} onDelete={this.handleDelete} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Timeline;
