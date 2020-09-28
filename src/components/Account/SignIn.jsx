import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/actions/userActions';
// Hooks
import { useInputs } from '../../hooks/useInputs';
// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// Icons
import LockRoundedIcon from '@material-ui/icons/LockRounded';
// Styles
import formStyles from './accountStyles';

const SignIn = (props) => {
  const classes = formStyles();
  const dispatch = useDispatch();
  const { handleSwitchAction } = props;
  const { loading, errors } = useSelector((state) => ({
    loading: state.ui.loading,
    errors: state.ui.errors,
  }));

  const initialState = {
    username: '',
    password: '',
  };
  const { inputs: userInputs, bind: bindUserInputs } = useInputs(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();

    const signInData = {
      username: userInputs.username.toLowerCase(),
      password: userInputs.password,
    };
    dispatch(signIn(signInData));
  };

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.registerPaper}>
        <Typography
          className={classes.registerTitle}
          component='h2'
          variant='h4'
        >
          Welcome back
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id='username'
                name='username'
                label='Username'
                variant='outlined'
                fullWidth
                required
                value={userInputs.username}
                error={errors ? true : false}
                {...bindUserInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='password'
                name='password'
                label='Password'
                type='password'
                variant='outlined'
                fullWidth
                required
                value={userInputs.password}
                error={errors ? true : false}
                {...bindUserInputs}
              />
            </Grid>
            <Grid item xs={12}>
              {errors && (
                <Typography
                  className={classes.generalError}
                  variant='body2'
                  align='center'
                >
                  {errors}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            className={classes.submitButton}
            color='primary'
            fullWidth
            type='submit'
            variant='contained'
            disabled={loading}
            startIcon={<LockRoundedIcon />}
          >
            Sign In
          </Button>
        </form>
        <Typography className={classes.registerFootnote} variant='subtitle2'>
          {"Don't have an account yet? Create one "}
          <Link href='#' onClick={handleSwitchAction}>
            here
          </Link>
          {'.'}
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignIn;
