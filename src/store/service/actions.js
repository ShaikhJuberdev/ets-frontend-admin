import {
  REGISTER_EMAIL_REQUEST,
  REGISTER_EMAIL_SUCCESS,
  REGISTER_EMAIL_FAILURE,
  CLEAR_EMAIL_MESSAGES,
} from "./actionTypes";

export const registerEmailRequest = (payload) => ({
  type: REGISTER_EMAIL_REQUEST,
  payload,
});

export const registerEmailSuccess = (message) => ({
  type: REGISTER_EMAIL_SUCCESS,
  payload: message,
});

export const registerEmailFailure = (error) => ({
  type: REGISTER_EMAIL_FAILURE,
  payload: error,
});

export const clearEmailMessages = () => ({
  type: CLEAR_EMAIL_MESSAGES,
});
