import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  wrapBtnClose: {
    textAlign: 'right',
  },
  btnClose: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
  },
  wrapBodyPopUp: {
    width: '70%',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: '50px',
  },
  sendIcon: {
    width: '40px',
    height: '40px',
    transform: 'rotate(-45deg)',
    margin: '10px 0 20px',
  },
  titlePopUp: {
    fontWeight: '700',
    marginBottom: '20px',
  },
  content: {
    color: '#A3A3A3',
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function RecoveryPopup({ isShow, handleClose }) {
  const classes = useStyles();
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isShow}
      >
        <DialogContent>
          <div className={classes.wrapBtnClose}>
            <CancelIcon
              onClick={handleClose}
              color="primary"
              className={classes.btnClose}
            />
          </div>
          <div className={classes.wrapBodyPopUp}>
            <SendIcon className={classes.sendIcon} color="primary" />
            <Typography className={classes.titlePopUp} variant="h4">
              Recover password
            </Typography>
            <Typography className={classes.content}>
              An email has been sent to you please open that link to reset your
              password
            </Typography>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default RecoveryPopup;
