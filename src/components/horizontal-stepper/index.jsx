/* eslint-disable no-nested-ternary */
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { findIndex, isEmpty } from 'lodash';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { dataSourceStateAtom } from '@/recoil/atom/data-source-state';
import { steps } from './constant';

const useStyles = makeStyles((theme) => ({
  stepLabelRoot: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  iconStyle: {
    paddingRight: 0,
    '& svg': {
      width: '30px',
      height: '30px',
    },
  },
  labelStyle1: {
    marginTop: '0px',
    paddingTop: '10px',
    fontSize: '13px',
    fontWeight: '500',
    position: 'absolute',
    minWidth: '90px',
    right: '50%',
    transform: 'translateX(50%)',
    textAlign: 'center',
  },
  activeStep: {
    '&.MuiStepLabel-label ': {
      color: '#0F81C0',
    },
  },
  completedStep: {
    '&.MuiStepLabel-label ': {
      color: '#0F81C0',
    },
  },
  connectorLineActive: {
    '& + .MuiStepConnector-root': {
      '& .MuiStepConnector-line': {
        borderColor: '#0F81C0 !important',
        borderWidth: '2px !important',
      },
    },
  },
}));

export default function HorizontalLinearStepper({
  trigger = () => {},
  errors = {},
  handleSubmit,
  setDataToRecoilStore,
  step,
}) {
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const { pathname } = useLocation();

  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);

  const classes = useStyles();

  const navigate = useNavigate();

  const handleNext = () => {
    // trigger(); /** For test error messages when submit */
    if (handleSubmit)
      /** Handle submit when onclick next button */
      handleSubmit((values) => {
        /** When click next button -> set value to recoil store */
        setDataToRecoilStore && setDataToRecoilStore(values);

        setActiveStep((prevActiveStep) => {
          if (prevActiveStep < steps.length - 1) return prevActiveStep + 1;
          return prevActiveStep;
        });
        navigate(steps[activeStep + 1].path);
      })();
    else {
      setActiveStep((prevActiveStep) => {
        if (prevActiveStep < steps.length - 1) return prevActiveStep + 1;
        return prevActiveStep;
      });
      navigate(steps[activeStep + 1].path);
    }
  };

  React.useEffect(() => {
    /** Check case reload page back to step 1, except step 2 */
    if (activeStep !== 0 && activeStep !== 1 && !dataSourceState)
      navigate(steps[0].path);
  }, [activeStep]);

  React.useEffect(() => {
    const idx = findIndex(steps, (item) => item.path === pathname);
    if (idx !== -1) setActiveStep(idx);
  }, [pathname]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep > 0) {
        return prevActiveStep - 1;
      }
      return prevActiveStep;
    });
    navigate(steps[activeStep - 1].path);
  };

  const handleOnClickStep = (index) => {
    if (handleSubmit)
      handleSubmit((values) => {
        setDataToRecoilStore && setDataToRecoilStore(values);
        navigate(steps[index].path);
      })();
    else {
      navigate(steps[index].path);
    }
  };

  const dataSourceSummary = useDataSourceSummary(step);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100px',
        position: 'absolute',
        top: '128px',
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: '25px',
        justifyContent: 'space-around',
      }}
    >
      <div className="flex justify-center flex-col items-center">
        <IconButton
          sx={{
            width: '30px',
            height: '30px',
            backgroundColor: '#12293E',
            '&:hover': {
              backgroundColor: '#12293E',
            },
          }}
          // disabled={activeStep === 0}
          onClick={handleBack}
        >
          <NavigateBeforeRoundedIcon
            sx={{
              color: '#fff',
            }}
          />
        </IconButton>
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#12293E',
            marginTop: '3px',
            marginBottom: '0px',
          }}
        >
          Previous
        </p>
      </div>

      <Stepper
        sx={{
          width: '75%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          '& .MuiStepConnector-root': {
            marginTop: '15px',
          },
        }}
        activeStep={activeStep}
      >
        {steps.map((item, index) => {
          return (
            <Step
              key={item.label}
              sx={{
                px: 0,
                '& :hover': {
                  cursor: 'pointer',
                  '& .MuiStepLabel-label': { color: '#0F81C0 !important' },
                  '& .MuiSvgIcon-root': { color: '#0F81C0 !important' },
                },
              }}
              onClick={() => handleOnClickStep(index)}
              className={classNames({
                [classes.connectorLineActive]: index <= activeStep - 1,
              })}
            >
              <StepLabel
                classes={{
                  iconContainer: classes.iconStyle,
                  root: classes.stepLabelRoot,
                  active: classes.activeStep,
                  completed: classes.completedStep,
                  label: classes.labelStyle1,
                }}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <Button
          variant="contained"
          sx={{ padding: '5px', textTransform: 'none' }}
        >
          Submit
        </Button>
      ) : dataSourceSummary?.required?.length || activeStep === 0 ? (
        <div>
          <IconButton
            // disabled={!isEmpty(errors)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '30px',
              height: '30px',
              backgroundColor: !isEmpty(errors)
                ? 'rgba(0, 0, 0, 0.38)'
                : '#0F81C0',
              '&:hover': {
                backgroundColor: !isEmpty(errors)
                  ? 'rgba(0, 0, 0, 0.38)'
                  : '#0F81C0',
                cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
              },
            }}
            onClick={handleNext}
          >
            <NavigateNextRoundedIcon
              sx={{
                color: '#fff',
              }}
            />
          </IconButton>
          <p
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: !isEmpty(errors) ? 'rgba(0, 0, 0, 0.6)' : '#0F81C0',
              marginTop: '3px',
              marginBottom: '0px',
            }}
          >
            Next
          </p>
        </div>
      ) : (
        <Button
          sx={{
            py: '4px',
            textTransform: 'none',
            backgroundColor: !isEmpty(errors)
              ? 'rgba(0, 0, 0, 0.38)'
              : '#0F81C0',
            '&:hover': {
              backgroundColor: !isEmpty(errors)
                ? 'rgba(0, 0, 0, 0.38)'
                : '#0F81C0',
              cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
            },
          }}
          variant="contained"
          onClick={handleNext}
        >
          Skip
        </Button>
      )}
    </Box>
  );
}