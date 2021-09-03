import { TOGGLE_PROFILE_MODAL } from "../Actions";

const profileModal = (state= {visibility: false}, action ) => {
    switch (action.type){
        case TOGGLE_PROFILE_MODAL:
            return { 
                ...state,
                visibility: action.payload,
            };
        default:
            return state;
    };
};

export default profileModal;