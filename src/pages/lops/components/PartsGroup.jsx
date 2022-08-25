import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import NumberMultipleValueControl from '@/components/number-multiple-value-control';

const useStyles = makeStyles((theme) => ({
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
    // display: 'flex',
    justifyContent: 'space-between',
    '& .MuiAutocomplete-root': {
      width: '50%',
      '& .MuiOutlinedInput-root': {
        // height: 44,
        // borderRadius: 4,
        fontSize: 14,
        fontWeight: 400,
      },
    },
  },
}));

function PartsGroup({
  partsData,
  control,
  disabled,
  properties,
  setError,
  clearErrors,
}) {
  const classes = useStyles();
  const { title, parts, permission } = partsData || {};
  const partsGroupDisabled = useMemo(
    () => disabled || permission?.readOnlyControl,
    [disabled, permission]
  );
  return (
    <Paper className="rounded-lg overflow-hidden">
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.body}>
        <NumberMultipleValueControl
          control={control}
          name="partsGroup.parts"
          placeholder={`Enter ${
            properties?.properties?.parts?.minLength || 10
          } digit part number (s)`}
          minLength={properties?.properties?.parts?.minLength || 10}
          maxLength={properties?.properties?.parts?.maxLength || 10}
          setError={setError}
          title={parts?.title}
          hideLabel
          clearErrors={clearErrors}
          defaultValue={parts?.values}
          disabled={partsGroupDisabled}
        />
      </div>
    </Paper>
  );
}

export default PartsGroup;
