import { SET_USER, CLEAR_USER } from '../types';

const initialState = {
  username: '',
  permission: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        username: action.payload.username,
        permission: action.payload.permission,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}
