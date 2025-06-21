import { createStore } from "redux";

// Actions
const SET_ITEM = "SET_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

// Action creators
export const setItem = (key, value) => ({
  type: SET_ITEM,
  payload: { key, value },
});
export const removeItem = (key) => ({ type: REMOVE_ITEM, payload: key });

// Reducer
const initialState = {};

export const storageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case REMOVE_ITEM: {
      const newItem = { ...state };
      delete newItem[action.payload.key];
      return newItem;
    }
    default:
      return state;
  }
};

export const store = createStore(storageReducer);