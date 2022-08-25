import { HelpOutline } from '@mui/icons-material';
import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import DateRangeControl from '@/components/date-range-control';

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

function DateGroup({ dateGroup, name, disabled, control }) {
  const classes = useStyles();
  const { helpText, title: label, permission, dateRange } = dateGroup || {};

  const dateGroupDisabled =
    disabled ||
    permission?.readOnlyControl ||
    dateRange?.permission?.readOnlyControl;

  return (
    <Paper className="rounded-lg overflow-hidden h-full mb-5">
      <div className={classNames(classes.header)}>
        <Typography
          color="primary"
          className={classNames('text-base font-bold mt-[14px] mb-3 mr-3', {
            'opacity-[0.38]': dateGroupDisabled,
          })}
        >
          {label}
        </Typography>
        {helpText && (
          <Tooltip title={helpText} arrow placement="top">
            <HelpOutline
              color="primary"
              className={classNames({
                [classes.tooltipIconDisabled]: dateGroupDisabled,
              })}
              fontSize="small"
            />
          </Tooltip>
        )}
      </div>
      <Grid container className={classes.body}>
        <DateRangeControl
          control={control}
          name={name}
          disabled={dateGroupDisabled}
        />
      </Grid>
    </Paper>
  );
}

export default DateGroup;
