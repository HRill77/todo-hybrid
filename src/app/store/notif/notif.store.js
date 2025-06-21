import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Actions
const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

// Action creators
export const showNotification =
  (message, type = "success") =>
  (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { message, type },
    });

    setTimeout(() => {
      dispatch({ type: HIDE_NOTIFICATION });
    }, 3000);
  };
export const hideNotification = () => ({ type: HIDE_NOTIFICATION });

// Reducer
const initialState = {
  show: false,
  message: "",
  type: "success",
};

export const notifReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        show: true,
        message: action.payload.message,
        type: action.payload.type || "success",
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export const store = createStore(notifReducer, applyMiddleware(thunk));