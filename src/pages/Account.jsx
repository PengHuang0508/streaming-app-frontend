import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// MUI
import { makeStyles } from '@material-ui/core/styles';
// Components
import Register from '../components/Account/Register';
import SignIn from '../components/Account/SignIn';
// Files
import accountPageBackground from '../images/accountPageBackground.jpg';

const useStyles = makeStyles((theme) => ({
  accountPage: {
    flexGrow: 1,
    height: '100%',
    minHeight: 'calc(100vh - 100px)',
    paddingTop: 100,

    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${accountPageBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
}));

const Account = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const actionType = query.get('action');
  const [isNewUser, setIsNewUser] = useState(actionType === 'register');

  const handleSwitchAction = () => {
    setIsNewUser(!isNewUser);
  };

  return (
    <div className={classes.accountPage}>
      {isNewUser ? (
        <Register handleSwitchAction={handleSwitchAction} />
      ) : (
        <SignIn handleSwitchAction={handleSwitchAction} />
      )}
    </div>
  );
};

export default Account;
