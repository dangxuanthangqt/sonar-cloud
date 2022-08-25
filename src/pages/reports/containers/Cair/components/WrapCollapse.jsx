import React from 'react';
import { Box, Collapse, IconButton, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { TEXT_COLOR } from '@/layouts/constant';

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapCollapse: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    background: '#F5F5F5',
    padding: '15px 18px',
  },
  box: {
    padding: '1px 0',
    borderLeft: '1px solid #E5E5E5',
    borderRight: '1px solid #E5E5E5',
  },
}));

function WrapCollapse({ title, children }) {
  const classes = useStyles();
  const [openCollapse, setOpenCollapse] = React.useState(false);
  return (
    <>
      <div
        className={classNames(
          'flex justify-between items-center',
          classes.wrapCollapse
        )}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 15,
            color: TEXT_COLOR.BLUE.BLUE1,
          }}
        >
          {title}
        </Typography>
        <span>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </span>
      </div>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <Box className={classNames('', classes.box)}>{children}</Box>
      </Collapse>
    </>
  );
}

export default WrapCollapse;
