import { Edit } from '@mui/icons-material';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { useRecoilState } from 'recoil';
import React, { useMemo } from 'react';
import DataSourceSummary from '@/components/data-source-summary';
import { salesCodeStateAtom } from '@/recoil/atom/sales-code-state';
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
  date_value_label: {
    color: theme.palette.secondary.main,
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: 500,
    padding: 8,
    lineHeight: '200%',
    marginLeft: 15,
    width: '100%',
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
    fontSize: 14,
    marginLeft: 10,
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
}));

function SalesCode({ control }) {
  const classes = useCriteriaStyles();
  const dataSourceSummary = useDataSourceSummary(STEPS.SALE_CODES);
  const [salesCodeStateValue, setSalesCodeStateValue] =
    useRecoilState(salesCodeStateAtom);

  const childComp = useMemo(() => {
    return (
      <Box className={classes.keyword} container elevation={10}>
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>Criteria</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography className={classes.date_value_label}>
              {salesCodeStateValue?.matchAllSalesCode?.value}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Sales Codes
            </Typography>
          </Grid>

          {salesCodeStateValue?.salesCode?.map((item, index) => {
            return (
              // eslint-disable-next-line react/jsx-fragments, react/no-array-index-key
              <React.Fragment key={index}>
                <Grid item xs={1.5} sx={{ paddingRight: 10 }}>
                  <Typography className={classes.date_value_label}>
                    {item?.value?.value}
                  </Typography>
                </Grid>
                {index + 1 !== salesCodeStateValue?.salesCode.length && (
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
      <Typography className={classes.heading}>Sales Code</Typography>
      <DataSourceSummary dataSummary={dataSourceSummary} child={childComp} />
    </div>
  );
}
export default SalesCode;
