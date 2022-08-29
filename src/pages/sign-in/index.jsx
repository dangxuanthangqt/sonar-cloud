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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Backdrop from '@mui/material/Backdrop';
import { useForm } from 'react-hook-form';
import { signIn } from 'services/sign-in';
import { useMutation } from 'react-query';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import makeStyles from '@mui/styles/makeStyles';
import Banner from '@/components/banner-signin-signup';
import BackdropLoading from '@/components/backdrop-loading';
import RecoveryPopup from './component/recovery-popup';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

const useStyles = makeStyles((theme) => ({
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
  inputField: {
    width: '100%',
    marginLeft: '0',
    marginBottom: '8px',
  },
  description: {
    color: '#A3A3A3',
    cursor: 'pointer',
  },
  wrapRight: {
    margin: 'auto 0',
    padding: '50px 0',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  errorText: {
    textAlign: 'left',
    color: 'red',
    marginBottom: '15px',
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

const schema = yup
  .object({
    userName: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const index = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isShowBackdrop, setIsShowBackdrop] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { data, isLoading, mutate } = useMutation(['singIn'], (payload) =>
    signIn(payload)
  );
  if (data?.data) {
    navigate('/dashboard');
  }
  const onSubmit = (values) => {
    console.log('values', values);
    mutate(values);
  };
  const handleRecoveryPassword = () => {
    setIsShowBackdrop(true);
  };
  const handleClose = () => {
    setIsShowBackdrop(false);
  };
  return (
    <>
      <BackdropLoading open={isLoading} />
      <Banner>
        <form className={classes.wrapRight} onSubmit={handleSubmit(onSubmit)}>
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
              className={classes.inputField}
              {...register('userName')}
              id="outlined-basic"
              variant="outlined"
              placeholder="User name or email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.userName && (
              <div className={classes.errorText}>
                {errors.userName?.message}
              </div>
            )}
            <TextField
              className={classes.inputField}
              {...register('password')}
              type="password"
              id="outlined-basic"
              variant="outlined"
              placeholder="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <div className={classes.errorText}>
                <CloseIcon className={classes.spaceText} />
                <span>Icorrect password</span>
              </div>
            )}
            <div className={classes.groupBottomform}>
              <div
                aria-hidden="true"
                className={classes.recoveryPass}
                onClick={() => handleRecoveryPassword()}
              >
                Recovery Password
              </div>
              <Button
                variant="contained"
                size="large"
                endIcon={<ExitToAppIcon />}
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
        <RecoveryPopup isShow={isShowBackdrop} handleClose={handleClose} />
      </Banner>
    </>
  );
};

export default index;
