import React from "react";
import logo from "../image/logo.svg";
import { connect } from "react-redux";
import { toggleProfileModal } from '../Actions';

function Header(props) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <button
          type="button"
          className="btn btn-link"
          onClick={props.showProfileModal}
        >
        {props.user_name || 'ゲスト'}
        </button>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user_name: state.user.profile.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showProfileModal: () => dispatch(toggleProfileModal(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
