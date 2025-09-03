import {
  REGISTER_EMAIL_REQUEST,
  REGISTER_EMAIL_SUCCESS,
  REGISTER_EMAIL_FAILURE,
  CLEAR_EMAIL_MESSAGES,
} from "./actionTypes";

const initialState = {
  loading: false,
  successMessage: "",
  errorMessage: "",
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        successMessage: "",
        errorMessage: "",
      };
    case REGISTER_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
      };
    case REGISTER_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case CLEAR_EMAIL_MESSAGES:
      return {
        ...state,
        successMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default serviceReducer;
