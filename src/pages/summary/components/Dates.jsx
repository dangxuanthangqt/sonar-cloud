import { Box, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import DataSourceSummary from '@/components/data-source-summary';
import { datesStateAtom } from '@/recoil/atom/dates-state';
import { STEPS } from '@/common/constants';

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
    fontSize: '13px',

    marginLeft: 10,
    fontWeight: 600,
  },
  keyword_heading: {
    backgroundColor: theme.palette.primary.light,
    padding: 9,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 11,
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
  date_label: {
    lineHeight: '250%',
    color: theme.palette.secondary.main,
    fontSize: 15,
    paddingLeft: 18,
    fontWeight: 600,
    width: '6%',
  },
  date_value_label: {
    lineHeight: '250%',
    color: theme.palette.secondary.main,
    fontSize: 15,
    paddingLeft: 6,
    fontWeight: 400,
    marginRight: 15,
    width: '8%',
  },
}));

function Dates({ control }) {
  const classes = useCriteriaStyles();

  const dataSourceSummary = useDataSourceSummary(STEPS.DATES);
  const [datesState, setDatesState] = useRecoilState(datesStateAtom);

  const getDatetoDisplay = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  const childComp = useMemo(() => {
    return (
      <Box className={classes.keyword} container elevation={10}>
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Build Date
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                width: '100%',
                height: '100%',
              }}
            >
              <Typography className={classes.date_label}>From:</Typography>
              <Typography className={classes.date_value_label}>
                {getDatetoDisplay(datesState?.buildDateGroup[0]?.startDate)}
              </Typography>
              <Typography className={classes.date_label}>To:</Typography>
              <Typography className={classes.date_value_label}>
                {getDatetoDisplay(datesState?.buildDateGroup[0]?.endDate)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Report Date
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                width: '100%',
                height: '100%',
              }}
            >
              <Typography className={classes.date_label}>From:</Typography>
              <Typography className={classes.date_value_label}>
                {getDatetoDisplay(datesState?.incidentDateGroup[0]?.startDate)}
              </Typography>
              <Typography className={classes.date_label}>To:</Typography>
              <Typography className={classes.date_value_label}>
                {getDatetoDisplay(datesState?.incidentDateGroup[0]?.endDate)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Incident Date
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                width: '100%',
                height: '100%',
              }}
            >
              <Typography className={classes.date_label}>From:</Typography>
              <Typography className={classes.date_value_label}>
                {getDatetoDisplay(datesState?.reportDateGroup[0]?.startDate)}
              </Typography>
              <Typography className={classes.date_label}>To:</Typography>
              <Typography className={classes.date_value_label}>
                {getDatetoDisplay(datesState?.reportDateGroup[0]?.endDate)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }, []);

  return (
    <div>
      <Typography className={classes.heading}>Dates</Typography>
      <DataSourceSummary dataSummary={dataSourceSummary} child={childComp} />
    </div>
  );
}
export default Dates;
