import { Auth } from 'aws-amplify';
import { enqueueSnackbar } from './snackbarActions';
import history from '../../history';
import axios from 'axios';
import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_USER,
  CLEAR_USER,
} from '../actionTypes';

export const fetchUserInfoFromDatabase = (username) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/api/database/user/${username}`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data[0] });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const saveUserInfoToDatabase = (userInfo) => (dispatch) => {
  let formData = new FormData();

  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }

  axios
    .post('/api/database/user/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
    });
};

export const registerUser = (registerData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  Auth.signUp(registerData)
    .then(() => {
      const userInfo = {
        username: registerData.username,
        email: registerData.attributes.email,
        permission: 'free',
      };
      dispatch(saveUserInfoToDatabase(userInfo));
      dispatch({ type: SET_USER, payload: userInfo });
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const signIn = (signInData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });

  Auth.signIn(signInData)
    .then(() => {
      dispatch(fetchUserInfoFromDatabase(signInData.username));
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const updateUserPermission = (userInfo) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  let formData = new FormData();
  formData.append('permission', userInfo.permission);

  axios
    .post(`api/database/user/update/${userInfo.username}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      dispatch(
        enqueueSnackbar({
          message: `Your permission has been updated.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
          },
        })
      );
      dispatch(fetchUserInfoFromDatabase(userInfo.username));
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  Auth.signOut()
    .then(() => {
      dispatch({ type: CLEAR_USER });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
    });

  dispatch({ type: LOADING_UI_DONE });
};
