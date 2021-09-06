import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import { toggleProfileModal, fetchProfile } from '../Actions';


const ProfileModal = (props) =>{
    useEffect(() => {
        const storeKey = localStorage.getItem('apiKey');
        if (storeKey) props.fetchProfile(storeKey);
    },[]);

    const { id, profile_image_url } = props.profile;

    return (
        <Rodal 
            visible={props.visibility}
            onClose={props.close}
            animation={'zoom'}
        >
            <h4>プロフィール</h4>
            <p>{id}</p>

            <img src={profile_image_url} alt="" />

            {!props.loaded && (
                <div>
                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={props.fetchProfileWithPrompt}
                    >更新</button>
                </div>
            )}
        </Rodal>
    );
}

const mapState = (state) => {
    return {
        profile: state.user.profile,
        visibility: state.profileModal.visibility,
        loaded: !!state.user.profile.id,
    };
};
const mapDispatch = (dispatch) => {
    return {
        close: () => dispatch(toggleProfileModal(false)),
        fetchProfile: (token) => dispatch(fetchProfile(token)),
        fetchProfileWithPrompt: () => dispatch(fetchProfile(window.prompt('Your Qiita API token is ?\nhttps://qiita.com/settings/applications'))),
    };
};
export default connect(mapState, mapDispatch)(ProfileModal);