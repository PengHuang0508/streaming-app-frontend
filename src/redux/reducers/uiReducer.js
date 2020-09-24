import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UPLOAD_STATUS,
  CLEAR_UPLOAD_STATUS,
} from '../types';

const initialState = {
  loading: false,
  errors: null,
  uploadStatus: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case LOADING_UI_DONE:
      return {
        ...state,
        loading: false,
      };
    case SET_ERRORS:
      return {
        ...state,
        uploadStatus: 'Upload FAILED',
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        uploadStatus: '',
        errors: null,
      };

    case SET_UPLOAD_STATUS:
      return {
        ...state,
        uploadStatus: action.data,
      };
    case CLEAR_UPLOAD_STATUS:
      return {
        ...state,
        uploadStatus: '',
      };
    default:
      return state;
  }
}
