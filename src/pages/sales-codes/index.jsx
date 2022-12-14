import { yupResolver } from '@hookform/resolvers/yup';
import { HelpOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { isEmpty, last, omit } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { STEPS } from 'mocks/requests-view/mockData';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import makeStyles from '@mui/styles/makeStyles';
import { useMutation } from 'react-query';
import { createSalesCodeRequest } from 'services/data-request-service';
import BackdropLoading from '@/components/backdrop-loading';
import MainLayout from '@/components/main-layout';
import { salesCodeStateAtom } from '@/recoil/atom/sales-code-state';
import SalesCode from './components/SalesCode';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { steps } from '@/components/horizontal-stepper/constant';
import { StepperInfo } from '@/components/stepper-info';
import DataSourceSummary from '@/components/data-source-summary';
import { salesCodeEnum } from './constant';
import RequestTitle from '../summary/components/RequestTitle';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

const useStyles = makeStyles((theme) => ({
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
    textTransform: 'none',
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
    textTransform: 'none',
    pointerEvents: 'all !important',
  },
}));

const schema = yup.object().shape({
  matchAllSalesCode: yup.object().shape({
    value: yup
      .mixed()
      .nullable()
      .test('is-not-empty', 'Match All Sales Code required', (value, ctx) => {
        const { required } = ctx.options.context || [];
        if (required?.includes('matchAllSalesCode')) {
          return !!value;
        }
        return true;
      }),
  }),
  salesCode: yup.array().of(
    yup.object().shape({
      value: yup
        .mixed()
        .test('is-not-empty', 'Sales Code required', (value, ctx) => {
          const { required } = ctx.options.context || [];
          if (isEmpty(value?.value) && required?.includes('salesCode')) {
            return ctx.createError({
              message: 'Sales Code required',
            });
          }
          return true;
        }),
    })
  ),
});

function SalesCodes({ isLoading }) {
  const classes = useStyles();

  const { t } = useTranslation('sales-code');
  const [salesCodeStateValue, setSalesCodeStateValue] =
    useRecoilState(salesCodeStateAtom);

  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();

  const requiredFields = ['salesCode'];
  const matches = salesCodeEnum;

  const { control, reset, getValues, handleSubmit, trigger, watch } = useForm({
    defaultValues: {
      matchAllSalesCode: null,
      salesCode: [
        {
          value: '',
        },
      ],
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    context: { required: requiredFields, t },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salesCode',
  });

  const { errors } = useFormState({
    control,
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

  useEffect(() => {
    if (!isEmpty(salesCodeStateValue) && !isLoading) {
      reset(salesCodeStateValue);
    }
    // if (salesCodesSection) {
    //   reset({
    //     matchAllSalesCode: {
    //       ...salesCodesSection?.salesCodesGroup?.matchAllSalesCode,
    //       value:
    //         salesCodesSection?.salesCodesGroup?.matchAllSalesCode
    //           ?.salesCodeEnum,
    //     },
    //     salesCode: salesCodesSection?.salesCodesGroup?.salesCode?.map(
    //       (saleCode) => ({
    //         ...saleCode,
    //         value: {
    //           value: saleCode.value,
    //           label: saleCode.value,
    //         },
    //       })
    //     ),
    //   });
    // }
  }, [salesCodeStateValue]);

  const handleAppendNewRow = () => {
    const lastRow = last(fields);
    const newRow = {};
    Object.keys(omit(lastRow, ['id', 'value', 'permission'])).forEach((key) => {
      newRow[key] = lastRow[key];
    });
    append({ ...newRow, value: {} });
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.SALE_CODES);

  const {
    mutate: mutateSalesCodeRequest,
    isLoading: createSalesCodeRequestLoading,
  } = useMutation(['createSaleCodeRequest'], (payload) =>
    createSalesCodeRequest(payload)
  );

  const mutateCreation = ({ onSuccess, payload }) => {
    return mutateSalesCodeRequest(payload, { onSuccess });
  };

  const formatDataSubmitted = (values) => {
    return {
      criteria: values?.matchAllSalesCode?.value || '',
      salesCode: values?.salesCode?.map((item) => item?.value?.value),
    };
  };

  return (
    <MainLayout
      isShowSideBarStepper
      trigger={trigger}
      handleSubmit={handleSubmit}
      mutateCreation={mutateCreation}
      formatDataSubmitted={formatDataSubmitted}
      errors={errors}
      step={STEPS.SALE_CODES}
      setDataToRecoilStore={setSalesCodeStateValue}
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Sale Codes' },
        ],
        moreAction: !isLoading && (
          <LoadingButton
            variant="contained"
            color="primary"
            className="save-button"
            // onClick={handleSubmit(onSubmit)}
          >
            {t('common:buttons.save_parameters')}
          </LoadingButton>
        ),
      }}
    >
      <BackdropLoading open={isLoading || createSalesCodeRequestLoading} />
      <RequestTitle />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      <StepperInfo step={4} name="Sales Codes" />
      {!isLoading && (
        <>
          <SalesCode
            title="Sales Code"
            fields={fields}
            append={append}
            control={control}
            getValues={getValues}
            onAddNewRow={handleAppendNewRow}
            remove={remove}
            // disabled={isSalesCodesGroupDisabled}
            // isMatchAllSalesCodeDisabled={isMatchAllSalesCodeDisabled}
            matches={matches}
          />
          <Box className={classes.btnContainer}>
            <Button
              onClick={() => {
                handleSubmit((values) => {
                  if (requestTitleState?.value) {
                    handleErrorRequestTitle('');
                    mutateSalesCodeRequest(formatDataSubmitted(values), {
                      onSuccess: () => {
                        setSalesCodeStateValue(getValues());
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
                    mutateSalesCodeRequest(formatDataSubmitted(values), {
                      onSuccess: () => {
                        setSalesCodeStateValue(values);
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

export default SalesCodes;
