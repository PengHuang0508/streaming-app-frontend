import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMedia } from '../redux/actions/mediaActions';
// Hooks
import { useInputs } from '../hooks/useInputs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// Files
import { validateUploadData } from '../utils/validators';

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
  uploadSubmit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uploadStatus } = useSelector((state) => ({
    uploadStatus: state.ui.uploadStatus,
  }));

  // TODO set uploaded_by to username
  const initialState = {
    title: '',
    media_description: '',
    min_permission: 'free',
    uploaded_by: 'Anonymous',
  };

  const {
    inputs: userInputs,
    setInputs: userSetInputs,
    bind: bindUserInputs,
    reset: resetUserInputs,
  } = useInputs(initialState);

  const handleSelectFile = (e) => {
    let fileToUpload = e.target.files[0];

    userSetInputs({
      ...userInputs,
      fileToUpload: fileToUpload,
    });
  };

  const handleSubmit = (e) => {
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

        <form className={classes.uploadForm} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='title'
                label='Title'
                variant='outlined'
                fullWidth
                autoFocus
                required
                {...bindUserInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  name='filedToUpload'
                  InputProps={{
                    type: 'file',
                  }}
                  fullWidth
                  required
                  onChange={handleSelectFile}
                />
                <FormHelperText>Maximum file size: 50MB</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='media_description'
                label='Description'
                variant='outlined'
                multiline
                rows={5}
                fullWidth
                {...bindUserInputs}
              />
            </Grid>
          </Grid>

          {/* <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        // value={age}
        // onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
          {/* <InputLabel>Minimum Permission</InputLabel> */}
          {/* <Select
        id='min_permission'
        name='min_permission'
        label='Minimum Permission'
        {...bindUserInputs}
      >
        <MenuItem value='free'>Free</MenuItem>
        <MenuItem value='premium'>Premium</MenuItem>
      </Select> */}
          {/* <FormHelperText>Miniu</FormHelperText> */}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.uploadSubmit}
          >
            Upload
          </Button>
        </form>

        <h1>{uploadStatus}</h1>
      </Paper>
    </Container>
  );
};

export default Upload;

{
  /* <Container component="main" maxWidth="xs">
<CssBaseline />
<div className={classes.paper}>
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
    Sign up
  </Typography>
  <form className={classes.form} noValidate>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="fname"
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lname"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="I want to receive inspiration, marketing promotions and updates via email."
        />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Sign Up
    </Button>
    <Grid container justify="flex-end">
      <Grid item>
        <Link href="#" variant="body2">
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  </form>
</div>
<Box mt={5}>
  <Copyright />
</Box>
</Container> */
}
{
  /* <div>
  UPLOAD PAGE
  <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    style={{ display: "none" }}
  />
</Button>
  </div>; */
}

// var formData = new FormData();
// var imagefile = document.querySelector('#file');
// formData.append("image", imagefile.files[0]);
// axios.post('upload_file', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
// })

// fileChangedHandler = (event) => {
//   let file_size = event.target.files[0].size;

//   //or if you like to have name and type
//   let file_name = event.target.files[0].name;
//   let file_type = event.target.files[0].type;
//  //do whatever operation you want to do here
// };
