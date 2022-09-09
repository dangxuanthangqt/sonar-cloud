import { LoadingButton } from '@mui/lab';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm, useFormState } from 'react-hook-form';
import { isEmpty } from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { STEPS } from 'mocks/requests-view/mockData';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import makeStyles from '@mui/styles/makeStyles';
import { useMutation } from 'react-query';
import { createLopsPartRequest } from 'services/data-request-service';
import MainLayout from '@/components/main-layout';
import PartsGroup from './components/PartsGroup';
import LopsGroup from './components/LopsGroup';
import BackdropLoading from '@/components/backdrop-loading';
import { lopsAndPartsStateAtom } from '@/recoil/atom/lops-and-parts-state';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { StepperInfo } from '@/components/stepper-info';
import { steps } from '@/components/horizontal-stepper/constant';
import DataSourceSummary from '@/components/data-source-summary';
import { lopsPartProperties } from './constant';
import RequestTitle from '../summary/components/RequestTitle';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

const useStyles = makeStyles((theme) => ({
  boxPrevious: {
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
    color: '#FFFFFF',
    marginTop: '30px',
    marginBottom: '20px',
    pointerEvents: 'all !important',
  },
}));

const schema = yup.object().shape({
  partsGroup: yup.object().shape({
    parts: yup
      .array()
      .of(yup.string())
      .test('required', 'Required', (value, ctx) => {
        return (
          ctx.options.context.requiredFields.includes('parts') &&
          value.length > 0
        );
      }),
  }),
  lopCriteria: yup.array().of(
    yup.object().shape({
      lop: yup.string().test('lop', 'lop', (value, ctx) => {
        if (ctx.options.context.requiredFields.includes('lop') && !value) {
          return ctx.createError({ message: 'Lop is required' });
        }
        if (!value) return true;
        const {
          lopCriteriaGroup: { lopCriteriaList },
        } = ctx.options.context.properties || {};
        const { maxLength, minLength } =
          lopCriteriaList.lopCriteria.properties.lop;
        if (value.length < minLength || value.length > maxLength) {
          return ctx.createError({
            message: `Lop must be between ${minLength} and ${maxLength} characters`,
          });
        }
        return true;
      }),
      failureCode: yup
        .string()
        .test('failureCode', 'failureCode', (value, ctx) => {
          if (ctx.options.context.requiredFields.includes('lop') && !value) {
            return ctx.createError({ message: 'Failure code is required' });
          }
          if (!value) return true;
          const {
            lopCriteriaGroup: { lopCriteriaList },
          } = ctx.options.context.properties || {};
          const { maxLength, minLength } =
            lopCriteriaList.lopCriteria.properties.failureCode;
          if (value.length < minLength || value.length > maxLength) {
            return ctx.createError({
              message: `Failure code must be between ${minLength} and ${maxLength} characters`,
            });
          }
          return true;
        }),
    })
  ),
});

function Lops({ isLoading }) {
  const classes = useStyles();
  const { t } = useTranslation('lops');
  const [lopsAndPartsState, setLopsAndPartsState] = useRecoilState(
    lopsAndPartsStateAtom
  );
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();

  const lopsProperties = lopsPartProperties;

  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );
  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };

  const requiredFields = ['parts', 'lop', 'failureCode'];

  const {
    control,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      partsGroup: {
        parts: [],
      },
      lopCriteria: [{ lop: '', failureCode: '' }],
    },
    resolver: yupResolver(schema),
    context: {
      requiredFields,
      properties: lopsPartProperties || {},
    },
  });

  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    if (!isEmpty(lopsAndPartsState) && !isLoading) {
      reset(lopsAndPartsState);
    }
  }, []);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  const { mutate: mutateLopsPartRequest, isLoading: createLopsPartLoading } =
    useMutation(['createLopsPartRequest'], (payload) =>
      createLopsPartRequest(payload)
    );

  const mutateCreation = ({ onSuccess, payload }) => {
    return mutateLopsPartRequest(payload, { onSuccess });
  };

  const formatDataSubmitted = (values) => {
    return {
      parts: values?.partsGroup?.parts,
      lops: values?.lopCriteria,
    };
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.LOPS_PARTS);

  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
      formatDataSubmitted={formatDataSubmitted}
      mutateCreation={mutateCreation}
      setDataToRecoilStore={setLopsAndPartsState}
      errors={errors}
      trigger={trigger}
      step={STEPS.LOPS_PARTS}
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Keywords' },
        ],
        moreAction: !isLoading && (
          <LoadingButton
            variant="contained"
            color="primary"
            className="save-button"
            onClick={handleSubmit(onSubmit)}
          >
            {t('common:buttons.save_parameters')}
          </LoadingButton>
        ),
      }}
    >
      <BackdropLoading open={isLoading || createLopsPartLoading} />
      <RequestTitle />
      <StepperInfo step={6} name="LOPs Parts" />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      {!isLoading && (
        <>
          <PartsGroup
            control={control}
            partsData={{
              title: 'Parts',
            }}
            properties={lopsProperties?.lopAndPartsSection?.partGroup || {}}
            setError={setError}
            clearErrors={clearErrors}
            disabled={false}
          />
          <LopsGroup
            control={control}
            lopsData={{
              title: 'LOP Information',
            }}
            properties={
              lopsProperties?.lopAndPartsSection?.lopCriteriaGroup || {}
            }
            disabled={false}
          />
          <Box className={classes.boxPrevious}>
            <Button
              onClick={() => {
                handleSubmit((values) => {
                  if (requestTitleState?.value) {
                    handleErrorRequestTitle('');
                    mutateLopsPartRequest(formatDataSubmitted(values), {
                      onSuccess: () => {
                        setLopsAndPartsState(values);
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
                handleSubmit((values) => {
                  if (requestTitleState?.value) {
                    handleErrorRequestTitle('');
                    mutateLopsPartRequest(formatDataSubmitted(values), {
                      onSuccess: () => {
                        setLopsAndPartsState(values);
                        setActiveStep((prevActiveStep) => {
                          navigate(steps[activeStep + 1].path);
                          return prevActiveStep + 1;
                        });
                      },
                    });
                  } else {
                    handleErrorRequestTitle('Request title is required');
                  }
                })();
              }}
              className={classes.btnNext}
              sx={{
                backgroundColor: !isEmpty(errors)
                  ? 'rgba(0, 0, 0, 0.38)'
                  : '#0F81C0',
                '&:hover': {
                  cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
                },
              }}
              variant="contained"
              disabled={!isEmpty(errors)}
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

export default Lops;
