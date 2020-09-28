import axios from 'axios';
import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_MEDIA_LIST,
  SET_STREAM_URL,
} from '../actionTypes';
import { enqueueSnackbar } from './snackbarActions';

export const getMediaList = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .get('/api/database/media')
    .then((res) => {
      dispatch({ type: SET_MEDIA_LIST, payload: res.data });
      dispatch({ type: LOADING_UI_DONE });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const uploadMedia = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      dispatch(
        enqueueSnackbar({
          message:
            'Thank you for uploading your video. Please note it will take at least few minutes before the video is ready to be streamed. Please be patient and check back later.',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            autoHideDuration: 7000,
          },
        })
      );

      dispatch({ type: LOADING_UI_DONE });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOADING_UI_DONE });
      dispatch(
        enqueueSnackbar({
          message: `Error: ${err.response.data.message}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
          },
        })
      );
      dispatch({ type: SET_ERRORS, payload: err.response.data.message });
    });
};

export const streamMedia = (mediaKey) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .get(`/api/aws/stream/${mediaKey}`)
    .then((res) => {
      dispatch({ type: SET_STREAM_URL, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        enqueueSnackbar({
          message: `Error: ${err.response.data.message}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
          },
        })
      );
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const increaseView = (mediaKey) => (dispatch) => {
  axios.post(`/api/database/media/update/${mediaKey}/view`).catch((err) => {
    console.log(err);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  });
};

export const updateMedia = (mediaInfo) => (dispatch) => {
  let formData = new FormData();
  formData.append('title', mediaInfo.title);
  formData.append('media_description', mediaInfo.media_description);
  formData.append('min_permission', mediaInfo.min_permission);

  return axios
    .post(`/api/database/media/update/${mediaInfo.media_key}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      dispatch(getMediaList());
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        enqueueSnackbar({
          message: err.response.data.message,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
          },
        })
      );
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const deleteMedia = (mediaKey) => (dispatch) => {
  return axios
    .delete(`/api/database/media/delete/${mediaKey}`)
    .then(() => dispatch(getMediaList()))
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
