import { AddCircle, Clear } from '@mui/icons-material';
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
import cn from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import DynamicSingleValueLookup from '@/components/dynamic-single-value-lookup';

const useStyles = makeStyles((theme) => ({
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  salesCodeLookup: {
    '& .MuiOutlinedInput-root': {
      // height: 44,
      fontSize: 14,
      fontWeight: 400,
    },
  },
  salesCodeValue: {
    '& .MuiOutlinedInput-root': {
      height: 44,
      fontSize: 14,
    },
  },
}));

function SalesCode({
  title,
  control,
  fields,
  getValues,
  onAddNewRow,
  remove,
  disabled,
  isMatchAllSalesCodeDisabled,
  matches,
}) {
  const { t } = useTranslation('salesCode');
  const classes = useStyles();
  return (
    <Paper className="rounded-lg overflow-hidden">
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.body}>
        <FormControl className={cn('')} disabled={isMatchAllSalesCodeDisabled}>
          <Controller
            control={control}
            name="matchAllSalesCode.value"
            render={({ field }) => (
              <RadioGroup
                row
                name="row-radio-buttons-group"
                className="px-5"
                {...field}
              >
                {matches?.map((match) => (
                  <FormControlLabel
                    value={match}
                    control={<Radio />}
                    label={t(match)}
                    key={match}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
        {fields?.map(({ id, ...restField }, idx) => {
          const isSaleCodeDisabled =
            disabled || restField?.permission?.readOnlyControl;
          return (
            <Grid
              container
              spacing={2}
              className={cn('pl-4 mt-4', classes.contentBody)}
              direction="row"
              justifyContent="center"
              alignItems="start"
              key={id}
            >
              <Grid item xs={1} className="my-auto pl-5">
                <Typography>{idx + 1}</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                className={cn('pr-4', classes.salesCodeLookup)}
              >
                <DynamicSingleValueLookup
                  name={`salesCode[${idx}].value`}
                  url="/api/salesCode"
                  control={control}
                  {...restField}
                  title=""
                  placeholder="Choose Template"
                  disabled={isSaleCodeDisabled}
                  handleOptions={(options) =>
                    options?.data?.map((option) => ({
                      label: option.value,
                      value: option.value,
                    }))
                  }
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
                  onClick={() => {
                    if (fields.length > 1) remove(idx);
                  }}
                  disabled={isSaleCodeDisabled}
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
          className={cn(
            'ml-4 pl-0 hover:bg-transparent capitalize font-[700]',
            { 'mt-10': !isEmpty(fields) }
          )}
          disabled={disabled}
        >
          Add New Row
        </Button>
      </div>
    </Paper>
  );
}

export default SalesCode;
