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
export const SEARCH_QIITA_POSTS_REQUEST = 'qiita/SEARCH_POSTS/request';
export const SEARCH_QIITA_POSTS_SUCCESS = 'qiita/SEARCH_POSTS/success';
export const SEARCH_QIITA_POSTS_FAILURE = 'qiita/SEARCH_POSTS/failure';
export const FETCH_QIITA_POST_REQUEST = 'qiita/FETCH_POST/request';
export const FETCH_QIITA_POST_SUCCESS = 'qiita/FETCH_POST/success';
export const FETCH_QIITA_POST_FAILURE = 'qiita/FETCH_POST/failure';


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

const requestSearchQiitaPosts = params => {
  return { type: SEARCH_QIITA_POSTS_REQUEST, params };
}
const successSearchQiitaPosts = data => {
  return { type: SEARCH_QIITA_POSTS_SUCCESS, payload: data, date: new Date() };
}
const failureSearchQiitaPosts = error => {
  return { type: SEARCH_QIITA_POSTS_FAILURE, error };
}
export const searchQiitaPosts = (params, user_id) => {
  return (dispatch) => {
    dispatch(requestSearchQiitaPosts(params));

    const token = localStorage.getItem('apiKey');
    axios.get(`https://qiita.com/api/v2/users/${user_id}/stocks`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      dispatch(successSearchQiitaPosts(response.data));
    }).catch(error => {
      dispatch(failureSearchQiitaPosts(error));
    })
  };
}

const requestFetchQiitaPost = id => {
  return { type: FETCH_QIITA_POST_REQUEST, id };
}
const successFetchQiitaPost = data => {
  return { type: FETCH_QIITA_POST_SUCCESS, payload: data, date: new Date() };
}
const failureFetchQiitaPost = error => {
  return { type: FETCH_QIITA_POST_FAILURE, error };
}
export const fetchQiitaPost = id => {
  return dispatch => {
    dispatch(requestFetchQiitaPost(id));

    const token = localStorage.getItem('apiKey');
    axios.get(`https://qiita.com/api/v2/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      dispatch(successFetchQiitaPost(response.data));
    }).catch(error => {
      dispatch(failureFetchQiitaPost(error));
    })
  };
}