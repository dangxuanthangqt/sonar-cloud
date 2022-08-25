/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import { Box, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { useRecoilState } from 'recoil';
import React, { useMemo, useEffect } from 'react';
import DataSourceSummary from '@/components/data-source-summary';
import { lopsAndPartsStateAtom } from '@/recoil/atom/lops-and-parts-state';

const useCriteriaStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
  },
  label: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
  },
  additional_label: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
  },
  data_source: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  heading: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
  },
  data_source_1: {
    padding: 10,
    backgroundColor: theme.palette.secondary.tab_bg,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  keyword: {
    backgroundColor: theme.palette.secondary.ligt_bg,
    borderRadius: 6,
  },
  keyword_bolts: {
    fontSize: 13,
    marginLeft: 5,
    fontWeight: 600,
  },
  keyword_heading: {
    backgroundColor: theme.palette.primary.light,
    padding: 9,
    fontSize: 11,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    fontWeight: 400,
  },
  keyword_applied: {
    color: theme.colors.gray,
    fontSize: 14,
    fontWeight: 400,
  },
  inner_box: {
    paddingLeft: 18,
  },
  load_in: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 18,
    marginTop: 7,
  },
  date_value_label: {
    color: theme.palette.secondary.main,
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: 500,
    padding: 8,
    marginLeft: 15,
    lineHeight: '200%',
    marginRight: 15,
    width: '100%',
  },
}));

function LOPParts({ control }) {
  const classes = useCriteriaStyles();

  const dataSourceSummary = useDataSourceSummary('keywords');
  const [lopsAndPartsState, setLopsAndPartsState] = useRecoilState(
    lopsAndPartsStateAtom
  );

  const childComp = useMemo(() => {
    return (
      <Box className={classes.keyword} container elevation={10}>
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>LOP</Typography>
          </Grid>
          {/* <Grid item xs={4}> */}
          {lopsAndPartsState?.lopCriteria?.map((i, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={1}>
                  <Typography className={classes.date_value_label}>
                    {`${i.lop}`}
                  </Typography>
                </Grid>
                {index + 1 !== lopsAndPartsState?.lopCriteria?.length && (
                  <Divider orientation="vertical" variant="middle" flexItem />
                )}
              </React.Fragment>
            );
          })}
          {/* </Grid> */}

          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>Fail Code</Typography>
          </Grid>
          {lopsAndPartsState?.lopCriteria?.map((i, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={1.5}>
                  <Typography className={classes.date_value_label}>
                    {`${i.failureCode}`}
                  </Typography>
                </Grid>
                {index + 1 !== lopsAndPartsState?.lopCriteria?.length && (
                  <Divider orientation="vertical" variant="middle" flexItem />
                )}
              </React.Fragment>
            );
          })}
        </Grid>
        <Divider />
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>Parts</Typography>
          </Grid>
          {lopsAndPartsState?.partsGroup?.parts?.map((i, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={1.5}>
                  <Typography className={classes.date_value_label}>
                    {i}
                  </Typography>
                </Grid>
                {index + 1 !== lopsAndPartsState?.partsGroup?.parts.length && (
                  <Divider orientation="vertical" variant="middle" flexItem />
                )}
              </React.Fragment>
            );
          })}
        </Grid>
      </Box>
    );
  }, []);

  return (
    <div>
      <Typography className={classes.heading}>LOP Parts</Typography>
      <DataSourceSummary dataSummary={dataSourceSummary} child={childComp} />
    </div>
  );
}
export default LOPParts;
