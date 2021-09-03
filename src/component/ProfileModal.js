import React from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';


const ProfileModal = (props) =>{
    console.log({props});
    return (
        <Rodal 
            visible={false}
            onClose={() => {}}
            animation={'flip'}
        >
            <h4>プロフィール</h4>
            <p>{props.user.name}</p>
        </Rodal>
    );
}

const mapState = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatch = (dispatch) => null;
export default connect(mapState, mapDispatch)(ProfileModal);