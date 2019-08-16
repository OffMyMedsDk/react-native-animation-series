import { types } from "./actions";

const initialState = {
  toggled: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_MENU:
      return { ...state, toggled: action.payload };
    default:
      return { ...state };
  }
}
