// Action Types
export const ADD_TWEET = 'ADD_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const EDIT_VALUE = 'form/EDIT_VALUE';
export const RESET = 'form/RESET';
export const TOGGLE_PROFILE_MODAL = 'profilemodal/TOGGLE';

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
