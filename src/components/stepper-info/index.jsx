/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#919191',
  },
  stepName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#12293E',
    marginTop: 1,
  },
}));

export function StepperInfo({ step, name, title }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box>
        <Typography className={classes.stepTitle}>Step {step} :</Typography>
        <Typography className={classes.stepName}>{name}</Typography>
      </Box>
      <Button variant="outlined">Review</Button>
    </Box>
  );
}
