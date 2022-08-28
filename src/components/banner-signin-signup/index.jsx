/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import banner from '../../assets/img/banner.png';

const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: 'flex',
    textAlign: 'center',
  },
  wrapBanner: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const index = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapForm}>
      <div className={classes.wrapBanner}>
        <img
          src={banner}
          alt="banner"
          loading="lazy"
          style={{ width: '100%', height: '100vh' }}
        />
      </div>
      {children}
    </div>
  );
};

export default index;
