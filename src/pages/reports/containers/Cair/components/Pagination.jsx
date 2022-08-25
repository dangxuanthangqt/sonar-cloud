import { Grid, Pagination as Paging } from '@mui/material';
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@mui/styles';
import WrapCollapse from './WrapCollapse';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Pagination({ data }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid style={{ margin: '0px' }} item xs={12} md={12}>
        <Paging count={10} showFirstButton showLastButton />
      </Grid>
    </Grid>
  );
}

export default Pagination;
