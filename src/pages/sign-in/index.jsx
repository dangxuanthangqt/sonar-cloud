/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import {
  SvgIcon,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'services/sign-in';
import { useMutation } from 'react-query';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import makeStyles from '@mui/styles/makeStyles';
import Banner from '@/components/banner-signin-signup';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: 'flex',
    textAlign: 'center',
  },
  appName: {
    marginBottom: '50px',
    justifyContent: 'center',
    display: 'flex',
    '& .MuiTypography-root': {
      fontSize: theme.spacing(2),
      fontWeight: theme.typography.fontWeightBold,
      textTransform: 'uppercase',
      marginLeft: theme.spacing(0.5),
    },
  },
  content: {
    marginBottom: '30px',
  },
  description: {
    color: '#A3A3A3',
    cursor: 'pointer',
  },
  wrapRight: {
    margin: 'auto 0',
    padding: '50px 0',
    width: '50%',
  },
  errorText: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',
  },
  spaceText: {
    marginRight: '5px',
  },
  recoveryPass: {
    marginBottom: '20px',
    color: '#A3A3A3',
    cursor: 'pointer',
  },
  groupBottomform: {
    textAlign: 'right',
  },
}));

const index = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isWrongPassWord, setIsWrongPassWord] = useState(false);
  const handleChangeUserNmae = (value) => {
    setUserName(value);
  };
  const handleChangePassWord = (value) => {
    setPassWord(value);
  };
  const { data, mutate } = useMutation(['singIn'], () => signIn());
  if (data?.data) {
    navigate('/dashboard');
  }
  const submitSignIn = (e) => {
    e.preventDefault();
    if (passWord) {
      mutate();
    } else {
      setIsWrongPassWord(true);
      setTimeout(() => {
        setIsWrongPassWord(false);
      }, 2000);
    }
  };
  return (
    <div className={classes.wrapForm}>
      <Banner />
      <form className={classes.wrapRight} onSubmit={(e) => submitSignIn(e)}>
        <div style={{ padding: '0 50px' }}>
          <div className={classes.appName}>
            <SvgIcon
              component={Logo}
              width="28"
              height="28"
              viewBox="0 0 28 28"
            />
            <Typography>Request management</Typography>
          </div>
          <div className={classes.content}>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
              Hello again!
            </Typography>
            <div className={classes.description}>
              Please input login details to proceed
            </div>
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="User name or email"
            value={userName}
            onChange={(e) => handleChangeUserNmae(e.target.value)}
            sx={{ m: 1, width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="PassWord"
            value={passWord}
            onChange={(e) => handleChangePassWord(e.target.value)}
            sx={{ m: 1, width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {isWrongPassWord && (
            <div className={classes.errorText}>
              <CloseIcon className={classes.spaceText} />
              <span>Icorrect password</span>
            </div>
          )}
          <div className={classes.groupBottomform}>
            <div className={classes.recoveryPass}>Recovery Password</div>
            <Button
              variant="contained"
              size="large"
              endIcon={<ExitToAppIcon />}
              type="submit"
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default index;
