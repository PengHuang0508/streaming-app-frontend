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
import { Button } from '@material-ui/core';

// media_key VARCHAR(64) NOT NULL,
//       thumbnail_url VARCHAR(150) NOT NULL,
//       title VARCHAR(50) NOT NULL,
//       description VARCHAR (120),
//       duration TIME NOT NULL,
//       width INT(5) NOT NULL,
//       height INT(5) NOT NULL,
//       uploaded_by VARCHAR(50) DEFAULT 'Anonymous' NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       min_permission VARCHAR(20) DEFAULT 'free' NOT N

const useStyles = makeStyles((theme) => ({}));

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

    // TODO: validate file size
    dispatch(uploadMedia(formData));
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          required
          name='title'
          label='Title'
          // fullWidth

          {...bindUserInputs}
        />
        <TextField
          name='media_description'
          label='Description'
          // fullWidth

          {...bindUserInputs}
        />

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
        <TextField
          required
          name='firstName'
          label='First name'
          // fullWidth
          autoComplete='given-name'
          inputProps={{ type: 'file' }}
          onChange={handleSelectFile}
        />
        <Button type='submit'>SUBMIT</Button>
      </form>

      <h1>{uploadStatus}</h1>
    </div>
  );
};

export default Upload;

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
