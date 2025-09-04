import { SET_ALERTS } from "./actionTypes";

const INIT_STATE = {
alerts: [],
  page: {
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  },
};

const AlertReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ALERTS:
      return {
        ...state,
       alerts: action.payload.content || [],
        page: action.payload.page || state.page,
      };

    default:
      return state;
  }
};

export default AlertReducer;
