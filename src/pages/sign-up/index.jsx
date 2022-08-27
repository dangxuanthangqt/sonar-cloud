/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  SvgIcon,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useNavigate } from 'react-router-dom';
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
  inputField: {
    width: '100%',
    marginLeft: '0',
    marginBottom: '8px',
  },
  errorText: {
    textAlign: 'left',
    color: 'red',
    marginBottom: '15px',
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
  groupBottomform: {
    textAlign: 'right',
  },
}));

const schema = yup
  .object({
    email: yup.string().email().required(),
    userName: yup.string().required(),
    password: yup.string().required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords does not match')
      .required(),
  })
  .required();

const index = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className={classes.wrapForm}>
      <Banner />
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
              Please Sign up here
            </Typography>
            <div className={classes.description}>
              Please input login details to proceed
            </div>
          </div>
          <TextField
            {...register('email')}
            id="outlined-basic"
            variant="outlined"
            placeholder="Email"
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('userName')}
            id="outlined-basic"
            variant="outlined"
            placeholder="User name"
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {errors.userName && (
            <div className={classes.errorText}>{errors.userName?.message}</div>
          )}
          <TextField
            {...register('password')}
            type="password"
            id="outlined-basic"
            variant="outlined"
            placeholder="Password"
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <div className={classes.errorText}>{errors.password?.message}</div>
          )}
          <TextField
            {...register('repeatPassword')}
            type="password"
            id="outlined-basic"
            variant="outlined"
            placeholder="Repeat Password"
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {errors.repeatPassword && (
            <div className={classes.errorText}>
              {errors.repeatPassWord?.message}
            </div>
          )}
          <div className={classes.groupBottomform}>
            <Button
              variant="contained"
              size="large"
              endIcon={<OpenInBrowserIcon />}
              type="submit"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default index;
