import axios from "axios";

// Action Types
export const ADD_TWEET = 'ADD_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const EDIT_VALUE = 'form/EDIT_VALUE';
export const RESET = 'form/RESET';
export const TOGGLE_PROFILE_MODAL = 'profilemodal/TOGGLE';
export const FETCH_PROFILE_REQUEST = 'profile/FETCH/request';
export const FETCH_PROFILE_SUCCESS = 'profile/FETCH/success';
export const FETCH_PROFILE_FAILURE = 'profile/FETCH/failure';


// Action Creators
export const addTweet = (newTweet) => {
  return { type: ADD_TWEET, payload: newTweet };
}
export const deleteTweet = (tweet) => {
  return { type: DELETE_TWEET, payload: tweet };
}
export const editValue = (name, value) => {
  return { type: EDIT_VALUE, name, value };
}
export const reset = () => {
  return { type: RESET };
}

export const toggleProfileModal = (visibility) => {
  return { type: TOGGLE_PROFILE_MODAL, payload: visibility };
}

export const requestFetchProfile = (token) => {
  return { type: FETCH_PROFILE_REQUEST, payload: token}
}
export const successFetchProfile = (data) => {
  return { type: FETCH_PROFILE_SUCCESS, payload: data, date: new Date() }
}
export const failureFetchProfile = (error) => {
  return { type: FETCH_PROFILE_FAILURE, error: error }
}
export const fetchProfile = (token) => {
  return (dispatch) => {
    dispatch(requestFetchProfile(token));

    axios.get('https://qiita.com/api/v2/authenticated_user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      localStorage.setItem('apiKey', token);
      dispatch(successFetchProfile(response.data));
    }).catch(error =>{
      dispatch(failureFetchProfile(error));
    })
  }
}