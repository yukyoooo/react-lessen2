import React from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import { toggleProfileModal } from '../Actions';


const ProfileModal = (props) =>{
    console.log({props});
    return (
        <Rodal 
            visible={props.visibility}
            onClose={props.close}
            animation={'zoom'}
        >
            <h4>プロフィール</h4>
            <p>{props.user.name}</p>
        </Rodal>
    );
}

const mapState = (state) => {
    return {
        user: state.user,
        visibility: state.profileModal.visibility,
    };
};
const mapDispatch = (dispatch) => {
    return {
        close: () => dispatch(toggleProfileModal(false)),
    };
};
export default connect(mapState, mapDispatch)(ProfileModal);