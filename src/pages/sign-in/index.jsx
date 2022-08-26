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
  const classes = useStyles();
  return (
    <div className={classes.wrapForm}>
      <Banner />
      <Box className={classes.wrapRight}>
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
            label="User name or email"
            id="outlined-start-adornment"
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
            label="PassWord"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.errorText}>
            <CloseIcon className={classes.spaceText} />
            <span>Icorrect password</span>
          </div>
          <div className={classes.groupBottomform}>
            <div className={classes.recoveryPass}>Recovery Password</div>
            <Button
              variant="contained"
              size="large"
              endIcon={<ExitToAppIcon />}
            >
              Send
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default index;
