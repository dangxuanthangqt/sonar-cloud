import { Box, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecoilState } from 'recoil';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { keywordsStateAtom } from '@/recoil/atom/keywords-state';
import DataSourceSummary from '@/components/data-source-summary';
import SummaryChip from '@/components/Summary-chip';
import { STEPS } from '@/common/constants';

const useCriteriaStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
  },
  label: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
  },
  additional_label: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
  },
  data_source: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  heading: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
  },
  data_source_1: {
    padding: 10,
    backgroundColor: theme.palette.secondary.tab_bg,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  keyword: {
    backgroundColor: theme.palette.secondary.ligt_bg,
    borderRadius: 6,
  },
  keyword_bolts: {
    fontSize: '13px',
    marginLeft: 5,
    fontWeight: 700,
  },
  keyword_heading: {
    backgroundColor: theme.palette.primary.light,
    padding: 9,
    fontSize: 11,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    fontWeight: 400,
  },
  keyword_applied: {
    color: theme.colors.gray_light,
    fontSize: 14,
    marginTop: 4,
    fontWeight: 400,
  },
  inner_box: {
    paddingLeft: 18,
    marginBottom: 10,
  },
  load_in: {
    fontSize: 15,
    fontWeight: 500,
    color: theme.colors.text_color,
    marginLeft: 18,
    marginTop: 7,
  },
  load_in_empty: {
    fontSize: 15,
    fontWeight: 400,
    color: theme.colors.text_color,
    marginLeft: 8,
    marginTop: 7,
  },
  inner_control: {
    marginLeft: -8,
  },
}));

function Keyword() {
  const classes = useCriteriaStyles();

  const dataSourceSummary = useDataSourceSummary(STEPS.KEYWORDS);

  const { t } = useTranslation();

  const [keywordsStateValue, setKeywordsStateValue] =
    useRecoilState(keywordsStateAtom);

  /** Controlled filed array */

  const childComp = useMemo(() => {
    return (
      <Box className={classes.keyword} container elevation={10}>
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Loaded Template
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography className={classes.load_in}>
              {keywordsStateValue?.optionsGroup?.template?.value?.label ||
                'No Template Loaded'}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container elevation={10}>
          <Grid item className={classes.keyword_heading} xs={2}>
            <Typography className={classes.keyword_bolts}>
              Keywords Applied
            </Typography>
          </Grid>
          <Grid item xs={10} className={classes.inner_box}>
            {keywordsStateValue?.criteriaGroup?.map((i, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={index}>
                  <Typography className={classes.keyword_applied}>
                    {i?.criteria?.value?.label}
                  </Typography>
                  {i?.keywords?.value !== null &&
                  i?.keywords?.value?.length > 0 ? (
                    <Box className={classes.inner_control}>
                      {i?.keywords?.value?.map((j) => {
                        return <SummaryChip key={j} name={j} />;
                      })}
                    </Box>
                  ) : (
                    <Box className={classes.inner_control}>
                      <Typography className={classes.load_in_empty}>
                        No Keywords
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    );
  }, [keywordsStateValue]);

  return (
    <div>
      <Typography className={classes.heading}>Keywords</Typography>
      <DataSourceSummary dataSummary={dataSourceSummary} child={childComp} />
    </div>
  );
}

export default Keyword;
