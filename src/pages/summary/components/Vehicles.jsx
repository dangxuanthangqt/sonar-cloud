import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecoilState } from 'recoil';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import StringMultipleValueControl from '@/components/string-multiple-value-control';
import DataSourceSummary from '@/components/data-source-summary';
import { vehicleStateAtom } from '@/recoil/atom/vehicle-state';
import SummaryChip from '@/components/Summary-chip';
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
    marginTop: 10,
  },
  inner_box_plant: {
    marginTop: 10,
    paddingLeft: 18,
    marginBottom: 10,
  },
  inner_box_cell: {
    paddingLeft: 30,
  },
  load_in: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 18,
    marginTop: 7,
  },
}));

function createData(
  fromYear,
  toYear,
  family,
  line,
  series,
  style,
  bodyDescription
) {
  return { fromYear, toYear, family, line, series, style, bodyDescription };
}

function Vehicle({ control }) {
  const classes = useCriteriaStyles();
  const [rows, setRows] = useState([]);

  const dataSourceSummary = useDataSourceSummary(STEPS.VEHICLES);
  const [vehicleState, setVehicleState] = useRecoilState(vehicleStateAtom);

  useEffect(() => {
    setRows(
      vehicleState?.vehicles?.map((item) => {
        return createData(
          item?.fromYear?.value,
          item?.toYear?.value,
          item?.family?.value?.value,
          item?.line?.value?.value,
          item?.series?.value?.value,
          item?.style?.value?.value,
          item?.bodyDescription?.value
        );
      })
    );
  }, [vehicleState]);

  const childComp = useMemo(() => {
    return (
      <Box className={classes.keyword} container elevation={10}>
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Selected Plant
            </Typography>
          </Grid>
          <Grid item xs={10} className={classes.inner_box_plant}>
            {vehicleState?.plantGroup?.plant?.value?.map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <SummaryChip key={item.value} name={item?.value} />;
            })}
          </Grid>
        </Grid>
        <Divider />
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>Vehicles</Typography>
          </Grid>
          <Grid item xs={10} className={classes.inner_box}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="medium"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.inner_box_cell}>
                      From Year
                    </TableCell>
                    <TableCell align="center">To Year</TableCell>
                    <TableCell align="center">Family</TableCell>
                    <TableCell align="center">Line</TableCell>
                    <TableCell align="center">Series</TableCell>
                    <TableCell align="center">Styles</TableCell>
                    <TableCell align="left">Body Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <TableRow
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      sx={{
                        '&:last-child, &:last-child': { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.inner_box_cell}
                      >
                        {row.fromYear}
                      </TableCell>
                      <TableCell align="center">{row.toYear}</TableCell>
                      <TableCell align="center">{row.family}</TableCell>
                      <TableCell align="center">{row.line}</TableCell>
                      <TableCell align="center">{row.series}</TableCell>
                      <TableCell align="center">{row.style}</TableCell>
                      <TableCell align="left">{row.bodyDescription}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    );
  }, [rows]);
  return (
    <div>
      <Typography className={classes.heading}>Vehicles</Typography>
      <DataSourceSummary dataSummary={dataSourceSummary} child={childComp} />
    </div>
  );
}

export default Vehicle;
