import React from 'react';
import {
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const BorderLinearProgress = styled(LinearProgress)((props) => ({
  height: 10,
  borderRadius: 5,
  width: '180px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F4F7F5',
    borderBottom: '1px solid #E0E0E0',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      // eslint-disable-next-line no-nested-ternary
      props.status === 'error'
        ? '#E82B2B'
        : props.status === 'completed'
        ? '#31C238'
        : '#FFA113',
  },
}));
export default function Progress({
  progress: { completion = 4, isError = false } = {},
}) {
  const getStatusProgress = () => {
    if (isError) {
      return 'error';
    }
    if (completion === 5) return 'completed';
    return 'unCompleted';
  };
  return (
    <Box>
      <BorderLinearProgress
        status={getStatusProgress()}
        variant="determinate"
        value={completion ? (completion / 5) * 100 : 0}
      />
      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
        {`${isError ? 'Error: ' : ''}${completion} of 5 completed`}
      </Typography>
    </Box>
  );
}
