import { SET_USER, CLEAR_USER } from '../actionTypes';

const initialState = {
  username: '',
  email: '',
  permission: '',
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload,
        isAuthenticated: true,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}
