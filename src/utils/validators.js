/////
//Helper functions
/////
const isEmptyString = (string) => {
  if (!string || 0 === string.length) return true;
  else return false;
};

const isEmptyArray = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return true;
  else return false;
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

let errors = {};

errors.upload = {};
exports.validateUploadData = (data) => {
  console.log('data', data);
  if (isEmptyString(data.title)) {
    errors.upload.title = 'Title must not be empty';
  }
  if (!data.fileToUpload) {
    errors.upload.file = 'Must select a file';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
