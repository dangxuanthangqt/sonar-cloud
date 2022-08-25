import { LoadingButton } from '@mui/lab';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm, useFormState } from 'react-hook-form';
import { isEmpty } from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { STEPS } from 'mocks/requests-view/mockData';
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
  const { t } = useTranslation('lops');
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [lopsAndPartsState, setLopsAndPartsState] = useRecoilState(
    lopsAndPartsStateAtom
  );
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();

  const {
    dataSchema,
    data: { lopAndPartsSection },
  } = dataRequestStateValue || {};

  // const lopsProperties = useMemo(() => {
  //   if (isEmpty(dataSchema)) return {};
  //   const {
  //     definitions: {
  //       lopCriteriaGroup,
  //       lopCriteria,
  //       lopAndPartsSection: lopAndPartsSectionSchema,
  //       partGroup,
  //     },
  //   } = dataSchema;
  //   return {
  //     lopAndPartsSection: {
  //       ...(lopAndPartsSectionSchema || {}),
  //       partGroup: {
  //         ...(partGroup || {}),
  //       },
  //       lopCriteriaGroup: {
  //         ...(lopCriteriaGroup || {}),
  //         lopCriteriaList: {
  //           ...(lopCriteriaGroup?.lopCriteriaList || {}),
  //           lopCriteria: {
  //             ...(lopCriteria || {}),
  //           },
  //         },
  //       },
  //     },
  //   };
  // }, [dataSchema]);
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
    watch,
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

  // useEffect(
  //   () => () => {
  //     setLopsAndPartsState(getValues());
  //     reset();
  //   },
  //   []
  // );

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
            sx={{
              width: '123px',
              height: '40px',
              backgroundColor: !isEmpty(errors)
                ? 'rgba(0, 0, 0, 0.38)'
                : '#0F81C0',
              color: '#FFFFFF',
              mt: '30px',
              mb: '20px',
              textTransform: 'none',
              '&:hover': {
                cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
              },
              pointerEvents: 'all !important',
            }}
            variant="contained"
            disabled={!isEmpty(errors)}
          >
            {dataSourceSummary?.required?.length ? 'Next' : 'Skip'}
          </Button>
        </>
      )}
    </MainLayout>
  );
}

export default Lops;
