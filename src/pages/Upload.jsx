import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMedia } from '../redux/actions/mediaActions';
// Hooks
import { useInputs } from '../hooks/useInputs';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    flexGrow: 1,
    paddingTop: 80,
  },
  uploadPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(8),

    backgroundColor: '#eef7e9',
  },
  uploadAvatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.colors.primary[2],
  },
  uploadForm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  permissionRadio: {
    display: 'block',
  },
  uploadSubmit: {
    margin: theme.spacing(3, 0, 2),
  },
  loadingWarning: {
    marginTop: 5,
    color: 'red',
  },
  loadingCircle: {
    color: 'white',
  },
}));

const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, username } = useSelector((state) => ({
    loading: state.ui.loading,
    username: state.user.username,
  }));

  const initialState = {
    title: '',
    media_description: '',
    min_permission: 'free',
    uploaded_by: username,
  };

  const {
    inputs: userInputs,
    setInputs: userSetInputs,
    bind: bindUserInputs,
  } = useInputs(initialState);

  const handleSelectFile = (e) => {
    if (e.target.files.length > 1) {
      return alert('You can only upload one video/audio file at a time.');
    }

    let fileToUpload = e.target.files[0];
    userSetInputs({
      ...userInputs,
      fileToUpload: fileToUpload,
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    let formData = new FormData();

    for (let field in userInputs) {
      formData.append(field, userInputs[field]);
    }

    dispatch(uploadMedia(formData));
  };

  return (
    <Container
      className={classes.uploadContainer}
      component='main'
      maxWidth='md'
    >
      <Paper className={classes.uploadPaper}>
        <Avatar className={classes.uploadAvatar}>
          <CloudUploadIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Upload
        </Typography>

        <form className={classes.uploadForm} noValidate onSubmit={handleUpload}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='title'
                label='Title'
                variant='outlined'
                fullWidth
                autoFocus
                required
                disabled={loading}
                {...bindUserInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Permission</FormLabel>
                <RadioGroup
                  className={classes.permissionRadio}
                  aria-label='Permission'
                  name='min_permission'
                  value={userInputs.min_permission}
                  {...bindUserInputs}
                >
                  <FormControlLabel
                    label='Free'
                    value='free'
                    control={<Radio />}
                    disabled={loading}
                  />
                  <FormControlLabel
                    label='Premium'
                    value='premium'
                    control={<Radio />}
                    disabled={loading}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='filedToUpload'
                InputProps={{
                  type: 'file',
                }}
                fullWidth
                required
                disabled={loading}
                onChange={handleSelectFile}
              />
              <FormHelperText>Maximum file size: 25MB</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='media_description'
                label='Description'
                variant='outlined'
                multiline
                rows={5}
                fullWidth
                disabled={loading}
                {...bindUserInputs}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.uploadSubmit}
          >
            {loading ? (
              <CircularProgress className={classes.loadingCircle} />
            ) : (
              'Upload'
            )}
          </Button>
          {loading && (
            <Typography
              className={classes.loadingWarning}
              variant='subtitle2'
              align='center'
            >
              Please do not reload page.
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Upload;
