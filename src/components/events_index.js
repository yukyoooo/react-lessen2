import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { readEvents } from "../actions";

class EventsIndex extends Component {
  //componentが呼ばれた時に実行
  componentDidMount() {
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEvents()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ events: state.events });
const mapDispathToProps = { readEvents };
export default connect(mapStateToProps, mapDispathToProps)(EventsIndex);
