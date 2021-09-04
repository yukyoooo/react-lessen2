import React from "react";
import logo from "../image/logo.svg";
import { connect } from "react-redux";
import { toggleProfileModal } from '../Actions';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <NavLink exact to="/" activeClassName="text-info" className="btn btn-link">Home</NavLink>
      <NavLink to="/qiita" activeClassName="text-info" className="btn btn-link">Qiita</NavLink>
      <div className="w-100 text-right">
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
