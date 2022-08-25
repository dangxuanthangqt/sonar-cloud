import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { AddCircle, Clear } from '@mui/icons-material';
import cn from 'classnames';
import { Controller } from 'react-hook-form';
import StringMultipleValueControl from '@/components/string-multiple-value-control';
import FixedSingleValueLookup from '@/components/fixed-single-value-lookup';

const useCriteriaStyles = makeStyles((theme) => ({
  root: {},
  selectCustom: {
    width: 220,
  },
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
  body: {
    paddingLeft: theme.spacing(2),
    paddingBottom: 12,
    paddingRight: theme.spacing(2),
  },
  contentHeader: {
    backgroundColor: '#F8F9FA',
    paddingTop: 14,
    paddingBottom: 12,
    marginTop: 0,
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
    '& .MuiGrid-item': {
      paddingTop: 0,
    },
  },
  contentBody: {
    '& .MuiGrid-item': {
      paddingTop: 0,
    },
    '& .MuiButton-startIcon': {
      marginRight: 0,
      marginLeft: 0,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
    },
  },
  deleteButton: {
    transform: 'translate(-50%, 50%)',
  },
  andOrContainer: {
    left: 80,
    top: -9,
    transform: 'translateY(-100%)',
    '& .MuiFormControlLabel-label': {
      fontWeight: 500,
    },
    '&:before': {
      content: '" "',
      width: 1,
      position: 'absolute',
      top: 0,
      height: 10,
      backgroundColor: theme.palette.secondary.light,
      right: '50%',
      transform: 'translateY(-100%)',
    },
    '&:after': {
      content: '" "',
      width: 1,
      position: 'absolute',
      bottom: 0,
      height: 10,
      backgroundColor: theme.palette.secondary.light,
      right: '50%',
      transform: 'translateY(100%)',
    },
  },
  criteriaContainer: {
    '& .MuiOutlinedInput-root': {
      height: 44,
      fontSize: 14,
      fontWeight: 400,
    },
  },
  keywordsContainer: {
    '&:before': {
      content: '" "',
      width: 1,
      position: 'absolute',
      top: 0,
      height: 44,
      backgroundColor: theme.palette.secondary.light,
      left: 0,
    },
  },
}));

function Criteria({
  title,
  control,
  fields,
  getValues,
  onAddNewRow,
  remove,
  disabled,
  logicalOperatorEnum,
}) {
  const classes = useCriteriaStyles();
  return (
    <Paper className="rounded-lg overflow-hidden mt-8">
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.body}>
        <Paper className="rounded-lg overflow-hidden">
          <Grid container spacing={2} className={classes.contentHeader}>
            <Grid item xs={1}>
              <Typography>No.</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{fields?.[0]?.criteria?.title}</Typography>
            </Grid>
            <Grid item xs={7} sx={{ borderLeft: '1px solid #2C98F0' }}>
              <Typography>{fields?.[0]?.keywords?.title}</Typography>
            </Grid>
          </Grid>
          {fields.map(({ id, ...restField }, idx) => {
            const isCriteriaDisabled =
              disabled ||
              restField.permission?.readOnlyControl ||
              (restField.criteria?.permission?.readOnlyControl &&
                restField.keywords?.permission?.readOnlyControl);
            return (
              <Grid
                container
                spacing={2}
                className={cn('pl-4 mt-0', classes.contentBody, {
                  'mt-[62px]': idx > 0,
                })}
                direction="row"
                justifyContent="center"
                alignItems="start"
                key={id}
              >
                <Grid item xs={1}>
                  <Typography>{idx + 1}</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  className={cn('pr-4', classes.criteriaContainer)}
                >
                  <FixedSingleValueLookup
                    name={`criteriaGroup.${idx}.criteria.value`}
                    control={control}
                    {...restField.criteria}
                    title=""
                    placeholder="Choose Template"
                    disabled={isCriteriaDisabled}
                    handleOptions={(options) => {
                      return (
                        options?.data?.map((item) => ({
                          ...item,
                          value: item.value,
                          label: item.label,
                        })) || []
                      );
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={7}
                  className={cn('relative', classes.keywordsContainer)}
                >
                  {idx > 0 && (
                    <FormControl
                      className={cn(
                        'border-[1px] border-[#E0E0E0] rounded-full border-solid absolute',
                        classes.andOrContainer
                      )}
                      disabled={isCriteriaDisabled}
                    >
                      <Controller
                        control={control}
                        name={`criteriaGroup.${idx}.logicalOperator`}
                        render={({ field }) => (
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="w-[180px] justify-between px-5"
                            {...field}
                          >
                            {logicalOperatorEnum?.map((v) => (
                              <FormControlLabel
                                value={v}
                                control={<Radio />}
                                label={v}
                                key={v}
                                className="mr-0"
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                  )}
                  <StringMultipleValueControl
                    control={control}
                    {...restField.keywords}
                    name={`criteriaGroup.${idx}.keywords.value`}
                    defaultValue={getValues(
                      `criteriaGroup.${idx}.keywords.value`
                    )}
                    noBorder={false}
                    title=""
                    summary={false}
                  />
                </Grid>
                <Grid item xs={1} className="relative">
                  <Button
                    startIcon={<Clear fontSize="small" />}
                    variant="contained"
                    className={cn(
                      'rounded-full bg-[#F96A6A] w-5 h-5 min-w-0 absolute top-1/2 left-1/2',
                      classes.deleteButton
                    )}
                    size="small"
                    onClick={() => remove(idx)}
                    disabled={isCriteriaDisabled}
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
            onClick={onAddNewRow}
            className="ml-4 pl-0 hover:bg-transparent capitalize font-[700] mt-10"
            disabled={disabled}
          >
            Add New Row
          </Button>
        </Paper>
      </div>
    </Paper>
  );
}

export default Criteria;
