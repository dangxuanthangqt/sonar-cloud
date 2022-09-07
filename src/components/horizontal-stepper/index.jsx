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
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // height: '100px',
    position: 'fixed',
    top: '128px',
    width: '100%',
    alignItems: 'flex-start',
    padding: '25px 0',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
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
      color: 'transparent',
      border: 'solid 1px #6D6D6D',
      borderRadius: '100%',

      '& text': {
        fill: '#6D6D6D',
      },
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
  iconPrevious: {
    width: '30px',
    height: '30px',
    backgroundColor: '#12293E',
    '&:hover': {
      backgroundColor: '#12293E',
    },
  },
  titleBtnPrevious: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#12293E',
    marginTop: '3px',
    marginBottom: '0px',
  },
  stepper: {
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    '& .MuiStepConnector-root': {
      marginTop: '15px',
    },
  },
  step: {
    paddingTop: 0,
    paddingBottom: 0,
    '& :hover': {
      cursor: 'pointer',
      '& .MuiStepLabel-label': { color: '#0F81C0 !important' },
      '& .MuiSvgIcon-root': { color: '#0F81C0 !important' },
    },
  },
  skipBtn: {
    pointerEvents: 'none',
    paddingBottom: '4px',
    paddingTop: '4px',
    textTransform: 'none',
    color: 'transparent',
  },
  titleBtnNext: {
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '3px',
    marginBottom: '0px',
  },
  iconBtnNext: {
    display: 'flex',
    flexDirection: 'column',
    width: '30px',
    height: '30px',
  },
  btnSkip: {
    paddingTop: '4px',
    paddingBottom: '4px',
    textTransform: 'none',
  },
}));

export default function HorizontalLinearStepper({
  trigger = () => {},
  errors = {},
  handleSubmit,
  setDataToRecoilStore,
  step,
  mutateCreation,
  formatDataSubmitted,
}) {
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const { pathname } = useLocation();
  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );

  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);

  const classes = useStyles();

  const navigate = useNavigate();

  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };

  const handleBackOrNext = (number) => {
    // trigger(); /** For test error messages when submit */
    if (handleSubmit)
      /** Handle submit when onclick next button */
      handleSubmit((values) => {
        /** When click next button -> set value to recoil store */
        if (requestTitleState?.value) {
          handleErrorRequestTitle('');

          if (mutateCreation && formatDataSubmitted) {
            mutateCreation({
              payload: formatDataSubmitted(values),
              onSuccess: () => {
                setDataToRecoilStore && setDataToRecoilStore(values);
                setActiveStep((prevActiveStep) => {
                  if (
                    number > 0
                      ? prevActiveStep < steps.length - 1
                      : prevActiveStep > 0
                  )
                    return prevActiveStep + number;
                  return prevActiveStep;
                });
                navigate(steps[activeStep + number].path);
              },
            });
          } else {
            setDataToRecoilStore && setDataToRecoilStore(values);
            setActiveStep((prevActiveStep) => {
              if (
                number > 0
                  ? prevActiveStep < steps.length - 1
                  : prevActiveStep > 0
              )
                return prevActiveStep + number;
              return prevActiveStep;
            });
            navigate(steps[activeStep + number].path);
          }
        } else {
          handleErrorRequestTitle('Request title is required');
        }
      })();
    else if (requestTitleState?.value) {
      handleErrorRequestTitle('');
      setActiveStep((prevActiveStep) => {
        if (number > 0 ? prevActiveStep < steps.length - 1 : prevActiveStep > 0)
          return prevActiveStep + number;
        return prevActiveStep;
      });
      navigate(steps[activeStep + number].path);
    } else {
      handleErrorRequestTitle('Request title is required');
    }
  };

  React.useEffect(() => {
    /** Check case reload page back to step 1, except step 2 */
    if (activeStep !== 0 && !dataSourceState) navigate(steps[0].path);
  }, [activeStep]);

  React.useEffect(() => {
    const idx = findIndex(steps, (item) => item.path === pathname);
    if (idx !== -1) setActiveStep(idx);
  }, [pathname]);

  const handleOnClickStep = (index) => {
    if (handleSubmit)
      handleSubmit((values) => {
        if (requestTitleState?.value) {
          handleErrorRequestTitle('');
          if (mutateCreation && formatDataSubmitted) {
            mutateCreation({
              payload: formatDataSubmitted(values),
              onSuccess: () => {
                setDataToRecoilStore && setDataToRecoilStore(values);
                navigate(steps[index].path);
              },
            });
          } else {
            setDataToRecoilStore && setDataToRecoilStore(values);
            navigate(steps[index].path);
          }
        } else {
          handleErrorRequestTitle('Request title is required');
        }
      })();
    else if (requestTitleState?.value) {
      handleErrorRequestTitle('');
      navigate(steps[index].path);
    } else {
      handleErrorRequestTitle('Request title is required');
    }
  };

  const dataSourceSummary = useDataSourceSummary(step);

  return (
    <Box className={classes.container}>
      <div className="flex justify-center flex-col items-center">
        <IconButton
          className={classes.iconPrevious}
          sx={{
            display: activeStep === 0 ? 'none' : 'inline-flex',
          }}
          // disabled={activeStep === 0}
          onClick={() => handleBackOrNext(-1)}
        >
          <NavigateBeforeRoundedIcon
            sx={{
              color: '#fff',
            }}
          />
        </IconButton>
        <p
          className={classes.titleBtnPrevious}
          style={{
            display: activeStep === 0 ? 'none' : 'block',
          }}
        >
          Previous
        </p>
      </div>

      <Stepper
        className={`${classes.stepper} step-form-wrapper`}
        activeStep={activeStep}
      >
        {steps.map((item, index) => {
          return (
            <Step
              key={item.label}
              onClick={() => handleOnClickStep(index)}
              className={classNames(classes.step, {
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
        <Button className={classes.skipBtn}>Skip</Button>
      ) : dataSourceSummary?.required?.length || activeStep === 0 ? (
        <div>
          <IconButton
            // disabled={!isEmpty(errors)}
            className={classes.iconBtnNext}
            sx={{
              backgroundColor: !isEmpty(errors)
                ? 'rgba(0, 0, 0, 0.38)'
                : '#12293E',
              '&:hover': {
                backgroundColor: !isEmpty(errors)
                  ? 'rgba(0, 0, 0, 0.38)'
                  : '#12293E',
                cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
              },
            }}
            onClick={() => handleBackOrNext(1)}
          >
            <NavigateNextRoundedIcon
              sx={{
                color: '#fff',
              }}
            />
          </IconButton>
          <p
            className={classes.titleBtnNext}
            style={{
              color: !isEmpty(errors) ? 'rgba(0, 0, 0, 0.6)' : '#12293E',
            }}
          >
            Next
          </p>
        </div>
      ) : (
        <Button
          className={classes.btnSkip}
          sx={{
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
          onClick={() => handleBackOrNext(1)}
        >
          Skip
        </Button>
      )}
    </Box>
  );
}
