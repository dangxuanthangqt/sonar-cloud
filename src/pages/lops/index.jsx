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
import MainLayout from '@/components/main-layout';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
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
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [lopsAndPartsState, setLopsAndPartsState] = useRecoilState(
    lopsAndPartsStateAtom
  );
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();

  const {
    data: { lopAndPartsSection },
  } = dataRequestStateValue || {};

  const lopsProperties = lopsPartProperties;

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
      return;
    }
    if (lopAndPartsSection) {
      reset({
        partsGroup: {
          parts: lopAndPartsSection.partGroup?.parts?.values?.map((v) =>
            v.toString()
          ),
        },
        lopCriteria: lopAndPartsSection.lopCriteriaGroup?.lopCriteriaList?.map(
          (v) => ({ failureCode: v.failureCode?.value, lop: v.lop?.value })
        ),
      });
    }
  }, [lopAndPartsSection]);

  const lopsAndPartsSectionDisabled = useMemo(
    () => lopAndPartsSection?.permissions?.readOnlyControl,
    [lopAndPartsSection]
  );

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.LOPS_PARTS);

  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
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
      <BackdropLoading open={isLoading} />
      <RequestTitle />
      <StepperInfo step={6} name="LOPs Parts" />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      {!isLoading && (
        <>
          <PartsGroup
            control={control}
            partsData={lopAndPartsSection?.partGroup}
            properties={lopsProperties?.lopAndPartsSection?.partGroup || {}}
            setError={setError}
            clearErrors={clearErrors}
            disabled={lopsAndPartsSectionDisabled}
          />
          <LopsGroup
            control={control}
            lopsData={lopAndPartsSection?.lopCriteriaGroup}
            properties={
              lopsProperties?.lopAndPartsSection?.lopCriteriaGroup || {}
            }
            disabled={lopsAndPartsSectionDisabled}
          />
          <Box className={classes.boxPrevious}>
            <Button
              onClick={() => {
                handleSubmit(() => {
                  setLopsAndPartsState(getValues());
                  setActiveStep((prevActiveStep) => {
                    navigate(steps[activeStep - 1].path);
                    return prevActiveStep - 1;
                  });
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
                handleSubmit(() => {
                  setLopsAndPartsState(getValues());
                  setActiveStep((prevActiveStep) => {
                    navigate(steps[activeStep + 1].path);
                    return prevActiveStep + 1;
                  });
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
