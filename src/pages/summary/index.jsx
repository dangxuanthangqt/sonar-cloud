/* eslint-disable import/no-named-as-default-member */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

import { Box, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import MainLayout from '@/components/main-layout';
import RequestTitle from './components/RequestTitle';
import Keyword from './components/Keywords';
import Vehicle from './components/Vehicles';
import SalesCode from './components/SalesCode';
import Dates from './components/Dates';
import LOPParts from './components/LOPParts';

import { steps } from '@/components/horizontal-stepper/constant';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { StepperInfo } from '@/components/stepper-info';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

const useStyles = makeStyles((theme) => ({
  step: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 700,
    marginBlock: 6,
  },
  heading: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
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
  load_in: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 18,
    marginTop: 7,
  },
  multiInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      '&:hover': {
        border: 'none',
      },
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
  next_button: {
    marginTop: 50,
    width: '10%',
    marginBottom: 50,
  },
  previous_button: {
    width: '123px',
    height: '40px',
    color: '#0F81C0',
    marginTop: '30px',
    border: '1px solid #0F81C0',
    '&:hover': {
      border: '1px solid #0F81C0',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '50px',
    marginTop: '30px',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#919191',
    marginBottom: '10px',
  },
}));

function Summary({ isLoading }) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();
  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );
  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };

  const classes = useStyles();

  return (
    <MainLayout
      isShowSideBarStepper
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Summary' },
        ],
      }}
    >
      <Typography className={classes.stepTitle}>Step 7 :</Typography>
      <RequestTitle />
      {/* <AdditionalOptionalField /> */}
      <Keyword />
      <Vehicle />
      <SalesCode />
      <Dates />
      <LOPParts />
      <Box className={classes.buttonContainer}>
        <Button
          onClick={() => {
            if (requestTitleState?.value) {
              handleErrorRequestTitle('');
              setActiveStep((prevActiveStep) => {
                navigate(steps[activeStep - 1].path);
                return prevActiveStep - 1;
              });
            } else {
              handleErrorRequestTitle('Request title is required');
            }
          }}
          className={classes.previous_button}
          variant="outlined"
          startIcon={<SkipPreviousRoundedIcon />}
        >
          Previous
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          className={classes.next_button}
          endIcon={<SaveRoundedIcon />}
        >
          Save
        </LoadingButton>
      </Box>
    </MainLayout>
  );
}

export default Summary;
