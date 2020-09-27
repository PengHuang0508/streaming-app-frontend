import { SET_USER, CLEAR_USER } from '../types';

const initialState = {
  username: '',
  email: '',
  permission: 'free',
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        username: action.payload.username,
        email: action.payload.email,
        permission: action.payload.permission,
        isAuthenticated: true,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}
