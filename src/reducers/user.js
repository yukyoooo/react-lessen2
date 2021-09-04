import { FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_REQUEST } from "../Actions";

const initialUser = {
  fetching: false,
  lastUpdateAt: null,
  profile: {},
  error: null,
};
const user = (state = initialUser, action) => {
  switch(action.type){
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        profile: action.payload,
        lastUpdateAt: action.date,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default user;