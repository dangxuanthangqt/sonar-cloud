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
import { useEffect, useMemo } from 'react';
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
  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);

  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);

  const { t } = useTranslation();
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [keywordsStateValue, setKeywordsStateValue] =
    useRecoilState(keywordsStateAtom);
  const {
    data: { keyWordSection, id: dataRequestId },
  } = dataRequestStateValue || {};

  const navigate = useNavigate();

  const { data: templates, isFetching } = useQuery(
    ['getDataByCode', keyWordSection],
    () => getDataByCode({}, keyWordSection?.optionsGroup?.template?.url),
    {
      enabled: !!keyWordSection?.optionsGroup?.template?.url,
      select: (res) => res.data.data,
    }
  );

  const { control, reset, getValues, handleSubmit, setValue, watch, trigger } =
    useForm({
      defaultValues: {
        optionsGroup: {
          template: '',
          isExactMatch: '',
        },
        criteriaGroup: [
          {
            criteria: '',
            keywords: '',
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
      return;
    }
    if (keyWordSection) {
      reset({
        optionsGroup: {
          ...keyWordSection.optionsGroup,
          template: {
            ...keyWordSection.optionsGroup.template,
            value: {
              value: keyWordSection.optionsGroup.template.value,
              label: keyWordSection.optionsGroup.template.value,
            },
          },
        },
        criteriaGroup: mappingKeyWordsCriteria(
          keyWordSection.criteriaGroup?.keyWordsCriteria
        ),
      });
    }
  }, [keyWordSection, keywordsStateValue]);

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

  const isKeywordsDisabled = useMemo(
    () => keyWordSection?.permission?.readOnlyControl,
    [keyWordSection]
  );

  const isCriteriaDisabled = useMemo(
    () =>
      isKeywordsDisabled ||
      keyWordSection?.criteriaGroup?.permission?.readOnlyControl,
    [keyWordSection, isKeywordsDisabled]
  );

  const isOptionGroupDisabled = useMemo(
    () =>
      isKeywordsDisabled ||
      keyWordSection?.optionsGroup?.permission?.readOnlyControl,
    [keyWordSection, isKeywordsDisabled]
  );

  const watchCriteriaGroup = useWatch({ control, name: 'criteriaGroup' });
  const watchOptionsGroup = useWatch({ control, name: 'optionsGroup' });

  const effective = useMemo(() => {
    const result = [];
    forEach(watchCriteriaGroup, (criteriaGroup) => {
      const { criteria, keywords } = criteriaGroup;
      if (!isEmpty(criteria?.value) || !isEmpty(keywords?.value)) {
        result.push({ criteria: criteria.value, keywords: keywords.value });
      }
    });
    return result;
  }, [watchCriteriaGroup]);

  const handleSelectTemplate = (v) => {
    const filterTemplate = findLast(
      templates,
      (template) => template.template?.value === v.value
    );
    setValue(
      'criteriaGroup',
      mappingKeyWordsCriteria(filterTemplate?.criteriaGroup?.keyWordsCriteria)
    );
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.KEYWORDS);
  const previousDataSourceState = usePrevious(dataSourceState);

  if (dataSourceState === null && previousDataSourceState === null) {
    /** Check case when reload keywords pages */
    return <Navigate to={steps[0].path} replace />;
  }

  return (
    <MainLayout
      isShowSideBarStepper
      setDataToRecoilStore={setKeywordsStateValue}
      trigger={trigger}
      errors={errors}
      handleSubmit={handleSubmit}
      step={STEPS.KEYWORDS}
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Keywords' },
        ],
        moreAction: !isKeywordsDisabled && !isLoading && !isFetching && (
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
      <BackdropLoading open={isLoading || isFetching} />
      <RequestTitle />
      <StepperInfo step={2} name="Keywords" />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      {!isLoading && (
        <>
          <div className="flex justify-end items-center mb-4">
            <Tooltip
              title={
                <div
                  dangerouslySetInnerHTML={{
                    __html: keyWordSection?.hints?.replace(
                      /\n/gm,
                      '<br/><br/>'
                    ),
                  }}
                />
              }
            >
              <HelpOutline color="primary" />
            </Tooltip>
            <Typography color="primary" className="text-sm font-semibold">
              Hints
            </Typography>
          </div>
          <OptionsGroup
            title={keyWordSection?.optionsGroup?.title}
            control={control}
            getValues={getValues}
            disabled={isOptionGroupDisabled}
            watchOptionsGroup={watchOptionsGroup}
            templates={templates}
            handleSelectTemplate={handleSelectTemplate}
          />
          <Criteria
            title={keyWordSection?.criteriaGroup?.title}
            fields={controlledFields}
            append={append}
            control={control}
            getValues={getValues}
            onAddNewRow={handleAppendNewRow}
            remove={remove}
            disabled={isCriteriaDisabled}
            logicalOperatorEnum={['AND', 'OR']}
          />
          <Effective effective={effective} />
        </>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '70px',
          mt: '30px',
        }}
      >
        <Button
          onClick={() => {
            handleSubmit(() => {
              setKeywordsStateValue(getValues());
              setActiveStep((prevActiveStep) => {
                navigate(steps[activeStep - 1].path);
                return prevActiveStep - 1;
              });
            })();
          }}
          sx={{
            width: '123px',
            height: '40px',
            color: '#0F81C0',
            mt: '30px',
            border: '1px solid #0F81C0',
            '&:hover': {
              border: '1px solid #0F81C0',
            },
          }}
          variant="outlined"
          startIcon={<SkipPreviousRoundedIcon />}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            handleSubmit(() => {
              setKeywordsStateValue(getValues());
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
            '&:hover': {
              cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
            },
            pointerEvents: 'all !important',
          }}
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
