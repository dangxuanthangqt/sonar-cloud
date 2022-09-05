/* eslint-disable react/no-danger */
import { useTranslation } from 'react-i18next';
import {
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { findLast, forEach, isEmpty, last, omit, some } from 'lodash';
import { HelpOutline } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getDataByCode } from 'services/requests-service';
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { updateKeywordRequest } from 'mocks/keywords/response';
import usePrevious from 'hooks/common/usePrevious';
import { STEPS } from 'mocks/requests-view/mockData';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import makeStyles from '@mui/styles/makeStyles';
import { API_URL } from 'services/constant';
import { createKeywordRequest } from 'services/data-request-service';
import BackdropLoading from '@/components/backdrop-loading';
import MainLayout from '@/components/main-layout';
import Criteria from './components/Criteria';
import OptionsGroup from './components/OptionsGroup';
import Effective from './components/Effective';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import { keywordsStateAtom } from '@/recoil/atom/keywords-state';
import { StepperInfo } from '@/components/stepper-info';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { steps } from '@/components/horizontal-stepper/constant';
import DataSourceSummary from '@/components/data-source-summary';
import { dataSourceStateAtom } from '@/recoil/atom/data-source-state';
import RequestTitle from '../summary/components/RequestTitle';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';
import { hintKeywords } from './constant';

const useStyles = makeStyles((theme) => ({
  boxBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '70px',
    marginTop: '30px',
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
    color: '#FFFFFF',
    marginTop: '30px',
    marginBottom: '20px',
    pointerEvents: 'all !important',
  },
}));

const schema = yup.object().shape({
  criteriaGroup: yup.array().of(
    yup.object().shape({
      criteria: yup.object().shape({
        value: yup
          .object()
          .nullable()
          .test('is-not-empty', 'Criteria required', (value, ctx) => {
            const { required } = ctx.options.context || [];
            if (required?.includes('criteria')) {
              return !!value;
            }
            return true;
          }),
      }),
      keywords: yup.object().shape({
        value: yup
          .array()
          .nullable()
          .of(yup.string())
          .test('is-not-empty', 'Keywords required', (value, ctx) => {
            const {
              required,
              properties: { keywords },
            } = ctx.options.context || [];
            if (isEmpty(value) && required?.includes('keywords')) {
              return ctx.createError({
                message: 'Keywords required',
              });
            }
            if (isEmpty(keywords)) {
              return true;
            }
            if (
              !isEmpty(value) &&
              some(value, (v) => v?.length > keywords?.maxLength)
            ) {
              return ctx.createError({
                message: 'Keywords max length exceeded',
              });
            }
            return true;
          }),
      }),
    })
  ),
});

const mappingKeyWordsCriteria = (keyWordsCriteria) =>
  keyWordsCriteria?.map((k) => ({
    ...k,
    keywords: { ...k.keywords, value: k.keywords?.values || [] },
    criteria: {
      ...k.criteria,
      value: k.criteria?.value
        ? { value: k.criteria?.value, label: k.criteria?.value }
        : null,
    },
  })) || [];

function Keywords({ isLoading }) {
  const classes = useStyles();

  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);

  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);

  const { t } = useTranslation();
  const [keywordsStateValue, setKeywordsStateValue] =
    useRecoilState(keywordsStateAtom);

  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );
  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };
  const navigate = useNavigate();

  const { data: templates, isFetching } = useQuery(
    ['getDataByCode'],
    () => getDataByCode({}, `${API_URL}api/keywords_templates`),
    {
      select: (res) => res.data.data,
    }
  );

  const {
    control,
    reset,
    getValues,
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: {
      optionsGroup: {
        template: '',
        isExactMatch: '',
      },
      criteriaGroup: [
        {
          criteria: {},
          keywords: {},
        },
      ],
    },
    resolver: yupResolver(schema),
    context: {
      required: ['criteria', 'keywords'],
      properties: { keywords: { minLength: 1, maximum: 15 } },
      t,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'criteriaGroup',
  });

  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    if (!isEmpty(keywordsStateValue) && !isLoading) {
      reset(keywordsStateValue);
    }
    // if (keyWordSection) {
    //   reset({
    //     optionsGroup: {
    //       ...keyWordSection.optionsGroup,
    //       template: {
    //         ...keyWordSection.optionsGroup.template,
    //         value: {
    //           value: keyWordSection.optionsGroup.template.value,
    //           label: keyWordSection.optionsGroup.template.value,
    //         },
    //       },
    //     },
    //     criteriaGroup: mappingKeyWordsCriteria(
    //       keyWordSection.criteriaGroup?.keyWordsCriteria
    //     ),
    //   });
    // }
  }, [keywordsStateValue]);

  const watchFieldArray = watch('criteriaGroup');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const { mutate, isLoading: updateDataRequestLoading } = useMutation(
    ['updateKeywordRequest'],
    (data) => updateKeywordRequest({ requestId: 255, data })
  );
  const {
    mutate: mutateKeywordsRequest,
    isLoading: createKeywordRequestLoading,
  } = useMutation(['createKeywordRequest'], (payload) =>
    createKeywordRequest(payload)
  );

  const handleAppendNewRow = () => {
    const lastRow = last(controlledFields);
    const newRow = {};
    Object.keys(omit(lastRow, ['id'])).forEach((key) => {
      newRow[key] = {
        ...lastRow[key],
        values: [],
        value: null,
      };
      newRow.logicalOperator = 'AND';
    });
    append(newRow);
  };

  const onSubmit = (data) => {
    const { criteriaGroup, optionsGroup } = data;
    const payload = {
      criteriaGroup,
      optionsGroup,
    };

    mutate(payload);
  };

  const watchCriteriaGroup = useWatch({ control, name: 'criteriaGroup' });
  const watchOptionsGroup = useWatch({ control, name: 'optionsGroup' });

  const effective = useMemo(() => {
    const result = [];
    forEach(watchCriteriaGroup, (criteriaGroup) => {
      const { criteria, keywords, logicalOperator } = criteriaGroup;
      if (!isEmpty(criteria?.value) || !isEmpty(keywords?.value)) {
        result.push({
          criteria: criteria.value,
          keywords: keywords.value,
          operator: logicalOperator,
        });
      }
    });
    return result;
  }, [watchCriteriaGroup]);

  const handleSelectTemplate = (v) => {
    const filterTemplate = findLast(
      templates,
      (template) => template.template?.value === v.value
    );
    clearErrors(); /** clear  error message */
    setValue(
      'criteriaGroup',
      mappingKeyWordsCriteria(filterTemplate?.criteriaGroup?.keyWordsCriteria)
    );
  };

  const formatDataSubmitted = (values = []) => {
    return {
      selectedKeywordsTemplateId: values?.optionsGroup?.template?.value?.value,
      keywordsCriteria: values?.criteriaGroup.map((item) => {
        return {
          criteria: item?.criteria?.value?.value,
          keywords: item?.keywords?.value,
          logicalOperator: item?.logicalOperator || '',
        };
      }),
    };
  };

  const handleClickNextOrPrevious = (number) => {
    handleSubmit((values) => {
      if (requestTitleState?.value) {
        mutateKeywordsRequest(formatDataSubmitted(values), {
          onSuccess: () => {
            handleErrorRequestTitle('');
            setKeywordsStateValue(getValues());
            setActiveStep((prevActiveStep) => {
              navigate(steps[activeStep + number].path);
              return prevActiveStep + number;
            });
          },
        });
      } else {
        handleErrorRequestTitle('Request title is required');
      }
    })();
  };

  const mutateCreation = ({ onSuccess, payload }) => {
    return mutateKeywordsRequest(payload, { onSuccess });
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.KEYWORDS);

  return (
    <MainLayout
      isShowSideBarStepper
      setDataToRecoilStore={setKeywordsStateValue}
      trigger={trigger}
      errors={errors}
      handleSubmit={handleSubmit}
      mutateCreation={mutateCreation}
      formatDataSubmitted={formatDataSubmitted}
      step={STEPS.KEYWORDS}
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Keywords' },
        ],
        moreAction: !isLoading && !isFetching && (
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
      <BackdropLoading
        open={isLoading || isFetching || createKeywordRequestLoading}
      />
      <RequestTitle />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      <StepperInfo step={2} name="Keywords" />
      {!isLoading && (
        <>
          <OptionsGroup
            url={`${API_URL}api/keywords_templates`}
            hintKeywords={hintKeywords}
            title="Options"
            control={control}
            getValues={getValues}
            // disabled={isOptionGroupDisabled}
            watchOptionsGroup={watchOptionsGroup}
            templates={templates}
            handleSelectTemplate={handleSelectTemplate}
          />
          <Criteria
            url={`${API_URL}api/keywords_criteria`}
            title="Criteria"
            fields={controlledFields}
            append={append}
            control={control}
            getValues={getValues}
            onAddNewRow={handleAppendNewRow}
            remove={remove}
            // disabled={isCriteriaDisabled}
            logicalOperatorEnum={['AND', 'OR']}
          />
          <Effective effective={effective} />
        </>
      )}
      <Box className={classes.btnContainer}>
        <Button
          onClick={() => handleClickNextOrPrevious(-1)}
          className={classes.btnPrevious}
          variant="outlined"
          startIcon={<SkipPreviousRoundedIcon />}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleClickNextOrPrevious(1)}
          sx={{
            backgroundColor: !isEmpty(errors)
              ? 'rgba(0, 0, 0, 0.38)'
              : '#0F81C0',
            '&:hover': {
              cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
            },
          }}
          className={classes.btnNext}
          variant="contained"
          disabled={!isEmpty(errors)}
          endIcon={<SkipNextRoundedIcon />}
        >
          {dataSourceSummary?.required?.length ? 'Next' : 'Skip'}
        </Button>
      </Box>
    </MainLayout>
  );
}

export default Keywords;
