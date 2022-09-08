import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isEmpty, omit } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { HelpOutline } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { STEPS } from 'mocks/requests-view/mockData';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { useMutation } from 'react-query';
import { createDatesRequest } from 'services/data-request-service';
import BackdropLoading from '@/components/backdrop-loading';
import MainLayout from '@/components/main-layout';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import DateGroup from './components/DateGroup';

import { formatHint } from '@/common/utils';
import { datesStateAtom } from '@/recoil/atom/dates-state';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { StepperInfo } from '@/components/stepper-info';
import { steps } from '@/components/horizontal-stepper/constant';
import DataSourceSummary from '@/components/data-source-summary';
import RequestTitle from '../summary/components/RequestTitle';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

const useStyles = makeStyles((theme) => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-label': {
      fontWeight: 600,
    },
    '& .save-button': {
      marginLeft: theme.spacing(2),
    },
  },
  selectAllBtnRoot: {
    textTransform: 'none',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '70px',
    marginTop: '30px',
  },
  btnPrevious: {
    width: '123px',
    height: '40px',
    color: '#0F81C0',
    marginTop: '30px',
    border: '1px solid #0F81C0',
    '&:hover': {
      border: '1px solid #0F81C0',
    },
  },
  btnNext: {
    width: '123px',
    height: '40px',
    backgroundColor: '#0F81C0',
    color: '#FFFFFF',
    marginTop: '30px',
    marginBottom: '20px',
  },
}));

function Dates({ isLoading }) {
  const classes = useStyles();
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [datesState, setDatesState] = useRecoilState(datesStateAtom);
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();
  const {
    data: { datesSection },
  } = dataRequestStateValue || {};

  const { control, reset, handleSubmit, getValues } = useForm({
    defaultValues: {
      buildDateGroup: {
        startDate: new Date(),
        endDate: new Date(),
      },
      incidentDateGroup: {
        startDate: new Date(),
        endDate: new Date(),
      },
      reportDateGroup: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
  });

  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );
  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  useEffect(
    () => () => {
      setDatesState(getValues());
      reset();
    },
    []
  );

  useEffect(() => {
    if (!isEmpty(datesState) && !isLoading) {
      reset(datesState);
    }
  }, [reset]);

  const dateSectionDisabled = useMemo(
    // () => datesSection?.permission?.readOnlyControl,
    () => (param) => param === 'Vehicle build date',
    [datesSection]
  );

  const { mutate: mutateDatesRequest, isLoading: createDatesLoading } =
    useMutation(['createSaleCodeRequest'], (payload) =>
      createDatesRequest(payload)
    );

  const mutateCreation = ({ onSuccess, payload }) => {
    return mutateDatesRequest(payload, { onSuccess });
  };

  const formatDataSubmitted = (values) => {
    return {
      buildDateGroup: omit(values?.buildDateGroup, 'key'),
      incidentDateGroup: omit(values?.incidentDateGroup, 'key'),
      reportDateGroup: omit(values?.reportDateGroup, 'key'),
    };
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.DATES);

  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
      setDataToRecoilStore={setDatesState}
      mutateCreation={mutateCreation}
      formatDataSubmitted={formatDataSubmitted}
      step={STEPS.DATES}
      breadcrumbs={{
        trailing: [
          { label: t('breadcrumbs.create_new_request') },
          { label: 'Dates' },
        ],
        moreAction: !isLoading && !dateSectionDisabled && (
          <div className={classes.actionContainer}>
            <LoadingButton
              variant="contained"
              color="primary"
              className="save-button"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading
                ? t('buttons.in_progress')
                : t('buttons.save_parameters')}
            </LoadingButton>
          </div>
        ),
      }}
    >
      <BackdropLoading open={isLoading || createDatesLoading} />
      <RequestTitle />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      <StepperInfo step={5} name="Dates" />
      {!isLoading && (
        <>
          {/* <div
            className={classNames('flex justify-end items-center mb-4', {
              'opacity-[0.38]': dateSectionDisabled,
            })}
          >
            <Tooltip
              title={
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: formatHint(datesSection?.hints),
                  }}
                />
              }
            >
              <HelpOutline color="primary" />
            </Tooltip>
            <Typography color="primary" className="text-sm font-semibold">
              Hints
            </Typography>
          </div> */}
          <DateGroup
            control={control}
            name="buildDateGroup"
            dateGroup={{
              helpText: 'The report date',
              title: 'Vehicle build date',
            }}
            // disabled={dateSectionDisabled(datesSection?.buildDateGroup?.title)}
          />
          <DateGroup
            control={control}
            name="incidentDateGroup"
            dateGroup={{
              helpText: 'The report incident date',
              title: 'Incident Date',
            }}
            // disabled={dateSectionDisabled(
            //   datesSection?.incidentDateGroup?.title
            // )}
          />
          <DateGroup
            control={control}
            name="reportDateGroup"
            dateGroup={{ helpText: 'The report date', title: 'Report Date' }}
            // disabled={dateSectionDisabled(datesSection?.reportDateGroup?.title)}
          />
          <Box className={classes.btnContainer}>
            <Button
              onClick={() => {
                handleSubmit(() => {
                  if (requestTitleState?.value) {
                    handleErrorRequestTitle('');
                    mutateDatesRequest(formatDataSubmitted(getValues()), {
                      onSuccess: () => {
                        setDatesState(getValues());
                        setActiveStep((prevActiveStep) => {
                          navigate(steps[activeStep - 1].path);
                          return prevActiveStep - 1;
                        });
                      },
                    });
                  } else {
                    handleErrorRequestTitle('Request title is required');
                  }
                })();
              }}
              className={classes.btnPrevious}
              variant="outlined"
              startIcon={<SkipPreviousRoundedIcon />}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (requestTitleState?.value) {
                  handleErrorRequestTitle('');
                  mutateDatesRequest(formatDataSubmitted(getValues()), {
                    onSuccess: () => {
                      setDatesState(getValues());
                      setActiveStep((prevActiveStep) => {
                        navigate(steps[activeStep + 1].path);
                        return prevActiveStep + 1;
                      });
                    },
                  });
                } else {
                  handleErrorRequestTitle('Request title is required');
                }
              }}
              className={classes.btnNext}
              variant="contained"
              endIcon={<SkipNextRoundedIcon />}
            >
              {dataSourceSummary?.required?.length ? 'Next' : 'Skip'}
            </Button>
          </Box>
        </>
      )}
    </MainLayout>
  );
}

export default Dates;
