/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import banner from '../../assets/img/banner.png';

const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: 'flex',
    textAlign: 'center',
    minHeight: '100vh',
  },
  wrapBanner: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
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
          className={classes.image}
        />
      </div>
      {children}
    </div>
  );
};

export default index;
