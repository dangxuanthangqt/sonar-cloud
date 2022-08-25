import { Grid, Paper, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { HelpOutline } from '@mui/icons-material';
import { useFieldArray, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import { forEach, some } from 'lodash';
import CheckboxController from '@/components/checkbox-controller';
import BooleanControl from '@/components/boolean-control';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControlLabel-root': {
      marginRight: theme.spacing(1),
      '& .MuiTypography-root': {
        color: theme.palette.primary.main,
        fontSize: 14,
        fontWeight: 700,
        '&.Mui-disabled': {
          opacity: 0.38,
        },
      },
    },
  },
  body: {
    paddingLeft: theme.spacing(2),
    paddingBottom: 12,
    paddingTop: 12,
    flexGrow: 1,
  },
  tooltipIconDisabled: {
    opacity: 0.38,
  },
}));

function FormGroup({
  formGroup,
  control,
  name: groupName,
  label,
  isFirst,
  disabled,
  groupIdx,
  setValue,
}) {
  const classes = useStyles();
  const { helpText } = formGroup;
  const { fields } = useFieldArray({
    control,
    name: `formGroups.${groupIdx}.dataSources`,
  });

  const watchDataSources = useWatch({
    control,
    name: `formGroups.${groupIdx}.dataSources`,
  });

  useEffect(() => {
    if (
      some(
        watchDataSources,
        (el) => !el.permission?.readOnlyControl && !el.value
      )
    ) {
      setValue(`formGroups.${groupIdx}.value`, false);
      return;
    }
    setValue(`formGroups.${groupIdx}.value`, true);
  }, [groupIdx, setValue, watchDataSources]);

  const handleGroupChange = (e) => {
    forEach(fields, (el, idx) => {
      if (el.permission?.readOnlyControl) return;
      setValue(
        `formGroups.${groupIdx}.dataSources.${idx}.value`,
        e.target.checked
      );
    });
  };

  return (
    <Paper className="rounded-lg overflow-hidden h-full">
      <div className={classes.header}>
        <CheckboxController
          control={control}
          name={groupName}
          label={label}
          disabled={disabled}
          onCheckboxChange={handleGroupChange}
          indeterminate={
            some(
              watchDataSources,
              (el) => !el.permission?.readOnlyControl && !el.value
            ) && some(watchDataSources, (el) => el.value)
          }
        />
        {helpText && (
          <Tooltip title={helpText} arrow placement="top">
            <HelpOutline
              color="primary"
              className={classNames({
                [classes.tooltipIconDisabled]: disabled,
              })}
              fontSize="small"
            />
          </Tooltip>
        )}
      </div>
      <Grid container className={classes.body}>
        {fields?.map(({ id, ...restField }, idx) => {
          return (
            <Grid item xs={12} lg={isFirst ? 4 : 12} key={id}>
              <BooleanControl
                control={control}
                name={`formGroups.${groupIdx}.dataSources.${idx}.value`}
                label={restField?.title}
                disabled={disabled}
                permission={restField.permission}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default FormGroup;
