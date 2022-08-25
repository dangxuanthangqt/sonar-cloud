/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Box, Typography } from '@mui/material';

export function StepperInfo({ step, name, title }) {
  return (
    <Box
      sx={{
        mb: '26px',
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: '#919191',
        }}
      >
        Step {step}:
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
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 400,
          color: '#6D6D6D',
          mt: '14px',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
