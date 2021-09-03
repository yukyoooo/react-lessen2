import React from "react";

export default class Tweet extends React.Component {
  handleClickDelete = () => {
    this.props.onDelete(this.props.tweet);
  };

  render() {
    const { tweet } = this.props;
    return (
      <div className="tweet">
        <div className="tweet-avatar">
          <span role="img">{tweet.avatar || '😀'}</span>
        </div>
        <div className="tweet-body">
          <h5>
            <span>{tweet.username || 'No Name'}</span>
            <time className="text-muted">・{tweet.ts.toLocaleString()}</time>
          </h5>
          <p>{tweet.message}</p>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={this.handleClickDelete}
          >削除</button>
        </div>
      </div>
    );
  }
}
