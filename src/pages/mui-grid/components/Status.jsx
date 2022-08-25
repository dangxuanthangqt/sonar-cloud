import React from 'react';
import { Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  error: {
    color: '#E82B2B',
    boxShadow: '0px 1px 5px rgba(232, 43, 43, 0.52)',
  },
  completed: {
    color: '#2E7D32',
    boxShadow: ' 0px 1px 5px rgba(46, 125, 50, 0.31)',
  },
  pending: {
    color: '#ED6C02',
    boxShadow: '0px 1px 5px rgba(237, 108, 2, 0.31)',
  },
}));

export default function Status({ status }) {
  const classes = useStyles();
  const getStatusText = () => {
    switch (status) {
      case 0:
        return 'Error';
      case 1:
        return 'Pending';
      default:
        return 'Completed';
    }
  };
  return (
    <Chip
      sx={{ background: 'white' }}
      className={
        // eslint-disable-next-line no-nested-ternary
        status === 0
          ? classes.error
          : status === 1
          ? classes.pending
          : classes.completed
      }
      label={getStatusText()}
    />
  );
}
