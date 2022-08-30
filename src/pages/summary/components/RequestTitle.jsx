import { Edit } from '@mui/icons-material';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';

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
  input: {
    width: '100%',
    marginBlock: 8,
    fontSize: 16,
    fontWeight: 400,
    '&::before': {
      borderBottom: '2px solid #0F81C0',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #0F81C0',
    },
    '&.Mui-disabled:before': {
      borderBottomStyle: 'solid',
    },
  },
  data_source_1: {
    padding: 10,
    backgroundColor: theme.palette.secondary.tab_bg,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  header1: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 700,
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
    paddingLeft: 18,
  },
  load_in: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 18,
    marginTop: 7,
  },
  edit_text: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 400,
  },
}));

function RequestTitle({ control, title = 'Request Title' }) {
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const [value, setValue] = useState(
    'This is request title This is request title'
  );
  const [disableTitle, setDisableTitle] = useState(true);
  const classes = useCriteriaStyles();
  return (
    <div
      style={{
        marginBottom: '25px',
      }}
    >
      <div className={classes.header1}>{title}</div>
      <Input
        className={classes.input}
        control={control}
        // defaultValue="This is request title This is request title"
        placeholder="Request title"
        disabled={activeStep === 0 ? false : disableTitle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        endAdornment={
          activeStep === 0 ? null : (
            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
              <IconButton
                className={classes.edit_text}
                color="primary"
                size="small"
                onClick={() => setDisableTitle(!disableTitle)}
              >
                <Edit />
                Edit
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </div>
  );
}

export default RequestTitle;
