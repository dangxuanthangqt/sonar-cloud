import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { AddCircle, Clear } from '@mui/icons-material';
import classNames from 'classnames';
import IntegerControl from '@/components/integer-control';
import StringControl from '@/components/string-control';

const useLogGroupStyles = makeStyles((theme) => ({
  root: {},
  selectCustom: {
    width: 220,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
  },
  body: {
    paddingLeft: theme.spacing(2),
    paddingBottom: 12,
    paddingTop: 25,
    // display: 'flex',
    justifyContent: 'space-between',
    '& .MuiOutlinedInput-input': {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  deleteButton: {
    transform: 'translateY(-50%)',
    '& .MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

function LopsGroup({ lopsData, control, disabled, properties }) {
  const classes = useLogGroupStyles();
  const { title } = lopsData || {};

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lopCriteria',
  });

  const lopProperties = useMemo(
    () => properties?.lopCriteriaList?.lopCriteria?.properties?.lop || {},
    [properties]
  );

  const failureCodeProperties = useMemo(
    () =>
      properties?.lopCriteriaList?.lopCriteria?.properties?.failureCode || {},
    [properties]
  );

  return (
    <Paper className="rounded-lg overflow-hidden mt-6">
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.body}>
        <Grid container spacing={5}>
          <Grid item xs={5}>
            <Typography className="text-xs font-medium">LOPs</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography className="text-xs font-medium">
              Failure code
            </Typography>
          </Grid>
        </Grid>
        <Divider className="mt-[10px] mb-4" />
        {fields.map((field, index) => {
          return (
            <Grid
              container
              spacing={5}
              className="mb-4 mt-0 items-start"
              key={field.id}
            >
              <Grid item xs={5} className="pt-0">
                <IntegerControl
                  variant="input"
                  control={control}
                  name={`lopCriteria[${index}].lop`}
                  placeholder={`Enter ${lopProperties?.minLength || 6} or ${
                    lopProperties?.maxLength || 8
                  } digit LOP, i.e. ${Array(lopProperties?.minLength || 6)
                    .fill(0)
                    .join('')}`}
                  disabled={false}
                  // permission={lopCriteriaList[index]?.lop?.permission}
                />
              </Grid>
              <Grid item xs={5} className="pt-0">
                <StringControl
                  control={control}
                  name={`lopCriteria[${index}].failureCode`}
                  placeholder={`i.e. ${Array(
                    failureCodeProperties?.minLength || 2
                  )
                    .fill('A')
                    .join('')}`}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={2} className="relative">
                <Button
                  startIcon={<Clear fontSize="small" />}
                  variant="contained"
                  className={classNames(
                    'rounded-full bg-[#F96A6A] w-5 h-5 min-w-0 absolute top-1/2 left-1/2',
                    classes.deleteButton
                  )}
                  size="small"
                  onClick={() => {
                    if (fields.length > 1) remove(index);
                  }}
                  disabled={false}
                />
              </Grid>
            </Grid>
          );
        })}
        <Button
          variant="text"
          startIcon={
            <AddCircle fontSize="inherit" sx={{ width: 32, height: 32 }} />
          }
          size="large"
          onClick={() => append({ lop: '', failureCode: '' })}
          className="pl-0 hover:bg-transparent capitalize font-[700] mt-1"
          disabled={false}
        >
          Add New Row
        </Button>
      </div>
    </Paper>
  );
}

export default LopsGroup;
