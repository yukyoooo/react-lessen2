import { EDIT_VALUE, RESET } from "../Actions";

const initialForm = { text: '', avatar: null };
const form = (state = initialForm, action) => {
  switch(action.type){
    case EDIT_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case RESET:
      return initialForm;
    default:
      return state;
  }
};

export default form;