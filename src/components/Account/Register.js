import React from 'react';
import { Auth } from 'aws-amplify';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { testing } from '../../redux/actions/uiActions';
// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
// Hooks
import { useInputs } from '../../hooks/useInputs';

const Register = () => {
  const dispatch = useDispatch();

  // testing
  const errors = {};
  const loading = false;

  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
  };
  const {
    inputs: userInputs,
    bind: bindUserInputs,
    reset: resetUserInputs,
  } = useInputs(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      username: userInputs.username,
      password: userInputs.password,
      confirmPassword: userInputs.confirmPassword,
    };

    try {
      const signUpResponse = Auth.signUp({
        username: userInputs.username,
        password: userInputs.password,
      });

      console.log('signupResponse', signUpResponse);
    } catch (error) {
      //set error to state
      errors = error;
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={errors.signUpUsername ? true : false}
            fullWidth
            helperText={errors.signUpUsername}
            id='username'
            label='Username Address'
            name='username'
            required
            value={userInputs.username}
            variant='outlined'
            {...bindUserInputs}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.signUpPassword ? true : false}
            fullWidth
            helperText={errors.signUpPassword}
            id='password'
            label='Password'
            name='password'
            required
            type='password'
            value={userInputs.password}
            variant='outlined'
            {...bindUserInputs}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.confirmPassword ? true : false}
            fullWidth
            helperText={errors.confirmPassword}
            id='confirmPassword'
            label='Confirm Password'
            name='confirmPassword'
            required
            type='password'
            value={userInputs.confirmPassword}
            variant='outlined'
            {...bindUserInputs}
          />
        </Grid>
        <Grid item xs={12}>
          {errors.general && (
            <Typography variant='body2'>{errors.signUpGeneral}</Typography>
          )}
        </Grid>
      </Grid>

      <Button
        color='primary'
        fullWidth
        type='submit'
        variant='contained'
        disabled={loading}
        startIcon={<LockRoundedIcon />}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
