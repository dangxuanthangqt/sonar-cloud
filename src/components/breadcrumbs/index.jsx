import { ChevronRight } from '@mui/icons-material';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { DefaultSidebarWidth } from '@/common/constants';

function Breadcrumbs({ trailing, moreAction, isShowSidebar }) {
  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );
  return (
    <Box
      sx={{
        position: 'absolute',
        top: isMobileOrTablet || isShowSidebar ? 128 : 205,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        left: 0,
        right: 0,
        pr: 2,
        minHeight: 64,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {trailing?.map((el, idx) => (
          <Box
            sx={{
              display: 'flex',
              width: DefaultSidebarWidth - 14,
              alignItems: 'center',
            }}
            key={`${el.label + idx}`}
          >
            {idx > 0 && <ChevronRight />}
            <Typography sx={{ fontWeight: 'bold', fontSize: 16, pl: 4 }}>
              {el.label}
            </Typography>
          </Box>
        ))}
      </Box>
      {moreAction}
    </Box>
  );
}

export default Breadcrumbs;
