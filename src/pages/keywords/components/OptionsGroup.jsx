import { Paper, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { HelpOutline } from '@mui/icons-material';
import BooleanControl from '@/components/boolean-control';
import FixedSingleValueLookup from '@/components/fixed-single-value-lookup';

const useOptionGroupStyles = makeStyles((theme) => ({
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
    display: 'flex',
    justifyContent: 'space-between',
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
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiAutocomplete-root': {
      width: 220,
      marginLeft: 16,
      '& .MuiOutlinedInput-root': {
        height: 44,
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 400,
      },
    },
  },
}));

function OptionsGroup({
  title,
  control,
  getValues,
  disabled,
  watchOptionsGroup,
  handleSelectTemplate,
  hintKeywords,
  url,
}) {
  const classes = useOptionGroupStyles();

  const templateFields = useMemo(
    () => watchOptionsGroup?.template || {},
    [watchOptionsGroup]
  );
  const isExactMatchFields = useMemo(
    () => watchOptionsGroup?.isExactMatch || {},
    [watchOptionsGroup]
  );

  return (
    <Paper className="rounded-lg overflow-hidden">
      <div className={classes.header}>
        <Typography>{title}</Typography>
        <div className="flex justify-end items-center">
          <Tooltip
            title={
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: hintKeywords.replace(/\n/gm, '<br/><br/>'),
                }}
              />
            }
          >
            <HelpOutline color="primary" />
          </Tooltip>
          <Typography color="primary" className="text-sm font-semibold">
            Hints
          </Typography>
        </div>
      </div>
      <div className={classes.body}>
        <div className="flex items-center">
          <Typography className="text-sm">{templateFields?.title}</Typography>
          <FixedSingleValueLookup
            url={url}
            name="optionsGroup.template.value"
            control={control}
            {...templateFields}
            title=""
            placeholder="Choose Template"
            disabled={disabled}
            handleOptions={(options) => {
              return options?.data?.map((option) => ({
                label: option.template?.value,
                value: option.template?.value,
              }));
            }}
            extendOnChange={handleSelectTemplate}
          />
        </div>
        {/* <BooleanControl
          {...isExactMatchFields}
          name="optionsGroup.isExactMatch.value"
          control={control}
          label={isExactMatchFields?.title || 'Exact Match'}
          disabled={disabled}
        /> */}
      </div>
    </Paper>
  );
}

export default OptionsGroup;
