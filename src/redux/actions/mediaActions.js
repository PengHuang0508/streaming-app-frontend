import axios from 'axios';
import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_MEDIA_LIST,
  SET_STREAM_URL,
  SET_UPLOAD_STATUS,
  CLEAR_UPLOAD_STATUS,
} from '../types';

export const getMediaList = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .get('/api/media')
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
  dispatch({
    type: SET_UPLOAD_STATUS,
    data: 'Request sent -> Uploading to AWS...',
  });

  // upload to AWS S3
  axios
    .post('/api/aws/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      dispatch({
        type: SET_UPLOAD_STATUS,
        data: 'Uploaded to AWS -> Converting to HLS...',
      });

      formData.append('media_key', res.data.media_key);

      dispatch(convertToHLS(formData));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const convertToHLS = (formData) => (dispatch) => {
  axios
    .post('/api/aws/convertToHLS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      dispatch({
        type: SET_UPLOAD_STATUS,
        data: 'Converted to HLS -> Adding to database...',
      });

      const mediaKey = res.data.media_key;
      const thumbnailURL = `https://s3-us-west-2.amazonaws.com/thumbnails.mellon.com/elastic-transcoder/hls/${mediaKey}/00001.png`;

      formData.append('media_key', mediaKey);
      formData.append('thumbnail_url', thumbnailURL);

      dispatch(saveToMediaDatabase(formData));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const saveToMediaDatabase = (formData) => (dispatch) => {
  axios
    .post('/api/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      dispatch({
        type: SET_UPLOAD_STATUS,
        data: 'Upload completed.',
      });

      dispatch({ type: LOADING_UI_DONE });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const streamMedia = (mediaKey) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .get(`/api/aws/stream/${mediaKey}`)
    .then((res) => {
      console.log('res.data', res.data);
      dispatch({ type: SET_STREAM_URL, payload: res.data });
      dispatch({ type: LOADING_UI_DONE });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};
