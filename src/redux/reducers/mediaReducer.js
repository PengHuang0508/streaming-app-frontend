import { SET_MEDIA_LIST, SET_STREAM_URL } from '../types';

const initialState = {
  mediaList: [],
  streamURL: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MEDIA_LIST:
      return {
        ...state,
        mediaList: action.payload,
      };

    case SET_STREAM_URL:
      return {
        ...state,
        streamURL: action.payload,
      };
    default:
      return state;
  }
}
