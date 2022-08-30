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
import { useMutation } from 'react-query';
import { signUp } from 'services/sign-up';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
    color: '#d32f2f',
    fontWeight: '400',
    fontSize: '0.75rem',
    lineHeight: '1.66',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    color: '#A3A3A3',
    cursor: 'pointer',
  },
  wrapRight: {
    margin: 'auto 0',
    padding: '50px 0',
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  groupBottomform: {
    textAlign: 'right',
  },
  signUpIcon: {
    transform: 'rotate(-90deg)',
  },
}));

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is a required field'),
    userName: yup.string().required('User Name is a required field'),
    password: yup.string().required('Password is a required field'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password does not match')
      .required('Repeat Password is a required field'),
  })
  .required();

function Index() {
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
  const { data, mutate } = useMutation(['singUp'], (payload) =>
    signUp(payload)
  );
  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };
  return (
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
              Please Sign up here
            </Typography>
            <div className={classes.description}>
              Please input login details to proceed
            </div>
          </div>
          <TextField
            error={errors.email}
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
          {errors.email && (
            <div className={classes.errorText}>{errors.email?.message}</div>
          )}
          <TextField
            error={errors.userName}
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
            error={errors.password}
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
            error={errors.repeatPassword}
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
              {errors.repeatPassword?.message}
            </div>
          )}
          <div className={classes.groupBottomform}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ExitToAppIcon className={classes.signUpIcon} />}
              type="submit"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </Banner>
  );
}

export default Index;
