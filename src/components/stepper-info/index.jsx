/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export function StepperInfo({ step, name, title }) {
  return (
    <Box
      sx={{
        mb: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: '#919191',
          }}
        >
          Step {step} :
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: '#12293E',
            mt: 1,
          }}
        >
          {name}
        </Typography>
      </Box>
      <Button variant="outlined">Review</Button>
    </Box>
  );
}
