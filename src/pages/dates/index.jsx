import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { HelpOutline } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { STEPS } from 'mocks/requests-view/mockData';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
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
      buildDateGroup: null,
      incidentDateGroup: null,
      reportDateGroup: null,
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
      return;
    }
    if (!isEmpty(datesSection)) {
      const { buildDateGroup, incidentDateGroup, reportDateGroup } =
        datesSection;
      reset({
        buildDateGroup: [
          {
            startDate: new Date(buildDateGroup.dateRange.fromDate.date),
            endDate: new Date(buildDateGroup.dateRange.toDate.date),
          },
        ],
        incidentDateGroup: [
          {
            startDate: new Date(incidentDateGroup.dateRange.fromDate.date),
            endDate: new Date(incidentDateGroup.dateRange.toDate.date),
          },
        ],
        reportDateGroup: [
          {
            startDate: new Date(reportDateGroup.dateRange.fromDate.date),
            endDate: new Date(reportDateGroup.dateRange.toDate.date),
          },
        ],
      });
    }
  }, [datesSection, reset]);

  const dateSectionDisabled = useMemo(
    // () => datesSection?.permission?.readOnlyControl,
    () => (param) => param === 'Vehicle build date',
    [datesSection]
  );

  const dataSourceSummary = useDataSourceSummary(STEPS.DATES);

  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
      setDataToRecoilStore={setDatesState}
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
      <BackdropLoading open={isLoading} />
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
            dateGroup={datesSection?.buildDateGroup}
            disabled={dateSectionDisabled(datesSection?.buildDateGroup?.title)}
          />
          <DateGroup
            control={control}
            name="incidentDateGroup"
            dateGroup={datesSection?.incidentDateGroup}
            disabled={dateSectionDisabled(
              datesSection?.incidentDateGroup?.title
            )}
          />
          <DateGroup
            control={control}
            name="reportDateGroup"
            dateGroup={datesSection?.reportDateGroup}
            disabled={dateSectionDisabled(datesSection?.reportDateGroup?.title)}
          />
          <Box className={classes.btnContainer}>
            <Button
              onClick={() => {
                handleSubmit(() => {
                  if (requestTitleState?.value) {
                    handleErrorRequestTitle('');
                    setDatesState(getValues());
                    setActiveStep((prevActiveStep) => {
                      navigate(steps[activeStep - 1].path);
                      return prevActiveStep - 1;
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

                  setDatesState(getValues());
                  setActiveStep((prevActiveStep) => {
                    navigate(steps[activeStep + 1].path);
                    return prevActiveStep + 1;
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
