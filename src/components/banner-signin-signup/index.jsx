/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import banner from '../../assets/img/banner.png';

const useStyles = makeStyles((theme) => ({
  wrapBanner: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const index = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapBanner}>
      <img
        // src="https://i.picsum.photos/id/807/536/354.jpg?hmac=kkWC8rAK1uphdPT88-ZzXPy808J739fsntRMFw-FCK0"
        src={banner}
        alt="banner"
        loading="lazy"
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default index;
