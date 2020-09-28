import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPermission, signOut } from '../../redux/actions/userActions';
// MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  permissionButton: {
    marginLeft: theme.spacing(1),
  },
}));

const UserInformationDisplay = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { username, permission } = useSelector((state) => ({
    username: state.user.username,
    permission: state.user.permission,
  }));

  const handleUpgradeAccount = () => {
    const userInfo = {
      username: username,
      permission: 'premium',
    };

    dispatch(updateUserPermission(userInfo));
  };

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDowngradeAccount = () => {
    const userInfo = {
      username: username,
      permission: 'free',
    };

    dispatch(updateUserPermission(userInfo));
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <React.Fragment>
      <Typography color='secondary'>{`${capitalizeString(
        permission
      )} account`}</Typography>

      {permission === 'free' ? (
        <Button
          className={classes.permissionButton}
          variant='contained'
          onClick={handleUpgradeAccount}
        >
          Upgrade
        </Button>
      ) : (
        <Button
          className={classes.permissionButton}
          variant='contained'
          onClick={handleDowngradeAccount}
        >
          Downgrade
        </Button>
      )}
      <Button onClick={handleSignOut}>Sign out</Button>
    </React.Fragment>
  );
};

export default UserInformationDisplay;
