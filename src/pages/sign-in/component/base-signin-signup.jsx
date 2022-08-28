/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
// import { Outlet } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Banner from '@/components/banner-signin-signup';

const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: 'flex',
    textAlign: 'center',
  },
}));

function BaseSigninSignup({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapForm}>
      <Banner />
      {children}
    </div>
  );
}

export default BaseSigninSignup;
