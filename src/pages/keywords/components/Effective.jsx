/* eslint-disable react/no-array-index-key */
import { Grid, Paper, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';

function Effective({ effective }) {
  const renderItem = (item) => {
    if (
      isEmpty(item.criteria) ||
      isEmpty(item.keywords) ||
      !Array.isArray(item.keywords)
    )
      return null;
    let relative = 'AND';
    if (
      ['Include : if match any', 'Exclude : if match any'].includes(
        item?.criteria?.label
      )
    ) {
      relative = 'OR';
    }
    return (
      <Typography className="text-sm">
        {item?.criteria?.label}
        :&nbsp;
        {item?.keywords?.map((k, idx) => (
          <Fragment key={idx}>
            {idx > 0 && (
              <span className="inline-block font-medium text-sm text-[#0F81C0]">
                &nbsp;
                {relative}
                &nbsp;
              </span>
            )}
            {k}
          </Fragment>
        ))}
      </Typography>
    );
  };

  return (
    <Grid container spacing={2} className="my-4">
      <Grid item xs={5}>
        <Paper className="py-4 px-[30px]">
          <Typography className="font-bold text-sm">
            Effective Keywords Search
          </Typography>
          {effective?.map((item, idx) => (
            <Fragment key={idx}>{renderItem(item)}</Fragment>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Effective;
