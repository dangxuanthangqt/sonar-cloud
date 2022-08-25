import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import usePrevious from 'hooks/common/usePrevious';
import { useGetDataReports } from 'hooks/queries/use-request-reports';
import { omit } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateCategorization } from 'services/requests-service';
import { globalStateAtom } from '@/recoil/atom/global-state';
import { TEXT_COLOR } from '@/layouts/constant';
import BackdropLoading from '@/components/backdrop-loading';
import { dataReportsAtom } from '../../../../../recoil/atom/data-reports-state';
import Pagination from '../../../components/Pagination';
import {
  checkboxListDefaultValue,
  checkBoxRecursiveDefaultValue,
  LIST_SELECTION,
  radioListDefaultValue,
} from '../constant';
import Categorization from './Categorization';
import InititalDescription from './InititalDescription';
import RequestStatus from './RequestStatus';
import Summary from './Summary';
import CairTableDetailed from './TableCair';

const useStyles = makeStyles((theme) => ({
  root: {},
  buttonCustom: {
    borderColor: '#B6B6B6',
    color: TEXT_COLOR.GRAY.GRAY2,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'none',
  },
  text: {
    color: '#0F81C0',
    fontWeight: 600,
  },
  sessionData: {
    boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '8px',
    padding: '18px 16px',
  },
  block: {
    overflow: 'hidden',
    position: 'relative',
  },
}));

function ItemData({ title, data, style }) {
  return (
    <div>
      <Typography className={classNames('text-xs', style)}>{title}</Typography>
      <Typography
        sx={{ mt: '3px', color: TEXT_COLOR.BLUE.BLUE1, fontSize: 14 }}
      >
        {data}
      </Typography>
    </div>
  );
}

function CairDetailed() {
  const classes = useStyles();
  // const [scrollPosition, setScrollPosition] = useState(0);
  const globalState = useRecoilValue(globalStateAtom);
  const dataReports = useRecoilValue(dataReportsAtom);

  const setDataReports = useSetRecoilState(dataReportsAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(7);
  const [inputValue, setInputValue] = useState(0);
  const previousPage = usePrevious(currentPage);

  /** Value of categorization */
  const [checkBoxRecursive, setCheckboxRecursive] = useState(
    checkBoxRecursiveDefaultValue
  );
  const [checkBoxList, setCheckBoxList] = useState(checkboxListDefaultValue);
  const [radioList, setRadioList] = useState(radioListDefaultValue);
  /** ---------------------------------------------------------------- */

  const { mutate } = useMutation(['Update Categorization'], (payload) =>
    updateCategorization({
      page: previousPage,
      data: payload,
    })
  );

  useEffect(() => {
    if (currentPage !== previousPage) {
      mutate({
        checkBoxList,
        radioList,
        checkBoxRecursive: {
          ...checkBoxRecursive,
          dataMaster: checkBoxRecursive?.dataMaster?.map((item) => ({
            ...omit(item, ['isAddNewParent']),
            child: item.child.map((child) => ({
              ...omit(child, ['isAddNewChild']),
            })),
          })),
        },
      });
    }
  }, [currentPage]);

  const { isFetching } = useGetDataReports({
    options: {
      onSuccess: (res) => setDataReports((prev) => ({ ...prev, data: res })),
    },
    params: {
      page: currentPage,
    },
  });

  const { data } = dataReports || {};

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const headerPosition = ref?.current?.getBoundingClientRect();
  const headerPosition1 = ref1?.current?.getBoundingClientRect();
  const headerPosition2 = ref2?.current?.getBoundingClientRect();

  const POINT_TO_FIXED = 25;
  const scrollTop = globalState?.mainLayout?.scrollTop || 0;
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /** Reset default state categorization */
  useEffect(() => {
    setCheckboxRecursive(data?.categorizationData?.checkBoxRecursive);
    setCheckBoxList(data?.categorizationData?.checkboxList);
    setRadioList(data?.categorizationData?.radioList);
  }, [data]);

  return (
    <div style={{ paddingBottom: '50px', position: 'relative' }}>
      <BackdropLoading open={isFetching} />
      <Grid ref={ref} container spacing={2} sx={{ paddingTop: '120px' }}>
        <Grid
          item
          ref={ref1}
          xs={12}
          md={12}
          sx={{
            position: 'fixed',
            top: '180px',
            backgroundColor: '#FFFFFF',
            width: ref.current?.clientWidth,
            zIndex: 1000,
            paddingBottom: '10px',
          }}
        >
          <div className="flex justify-between">
            <div>
              {LIST_SELECTION.map(({ id, icon, name }) => (
                <Button
                  key={id}
                  variant="outlined"
                  startIcon={icon}
                  className={classNames('mr-3', classes.buttonCustom)}
                >
                  {name}
                </Button>
              ))}
            </div>
            <Pagination
              setInputValue={setInputValue}
              inputValue={inputValue}
              currentPage={currentPage}
              totalPage={totalPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <Grid item xs={12} md={12} sx={{ marginTop: '18px' }}>
            <Link
              href="#"
              sx={{
                textDecoration: 'none',
                fontWeight: 700,
              }}
              className={classNames('text-base')}
            >
              New Customer Assistance Inquiry Record (CAIR # 01 )
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          md={8}
          sx={{
            '&.MuiGrid-item': {
              paddingTop: 0,
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <div
                className={classNames(
                  'flex justify-between w-auto',
                  classes.sessionData
                )}
              >
                {data?.reportData?.reportHead?.map((item, index) => (
                  <ItemData
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    title={item.title}
                    data={item.data}
                    style={classes.text}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <CairTableDetailed data={data?.reportData?.reportTable || []} />
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="flex flex-col gap-5">
                <span className={classNames('text-base', classes.text)}>
                  Note
                </span>
                <TextField
                  id="outlined-multiline-static"
                  placeholder="Write note..."
                  multiline
                  sx={{
                    backgroundColor: '#F1F1F1',
                    '& textarea': {
                      fontSize: '13px',
                      color: TEXT_COLOR.BLUE.BLUE1,
                      '&::placeholder': {
                        fontStyle: 'italic',
                      },
                    },
                  }}
                  rows={4}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <Summary data={data?.reportData?.reportSummary || {}} />
            </Grid>
            <Grid item xs={12} md={12}>
              <InititalDescription data={data?.reportData?.reportDesc} />
            </Grid>
            <Grid item xs={12} md={12}>
              <RequestStatus data={data?.reportData?.reportRequestStatus} />
            </Grid>
            <Grid item xs={12} md={12} sx={{ mt: 1 }}>
              <Pagination
                setInputValue={setInputValue}
                inputValue={inputValue}
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          ref={ref2}
          sx={{
            paddingTop: 0,
            width:
              scrollTop < POINT_TO_FIXED
                ? '33.33333%'
                : ref.current?.clientWidth / 3,
            position: scrollTop < POINT_TO_FIXED ? 'static' : 'fixed',
            top:
              scrollTop > POINT_TO_FIXED
                ? headerPosition1?.y + headerPosition1?.height
                : 'inherit',
            right: `calc(100vw -  ${headerPosition?.right}px)`,
            '&.MuiGrid-item': {
              paddingTop: 0,
            },
          }}
        >
          <Categorization
            checkBoxRecursive={checkBoxRecursive}
            setCheckboxRecursive={setCheckboxRecursive}
            checkBoxList={checkBoxList}
            setCheckBoxList={setCheckBoxList}
            radioList={radioList}
            setRadioList={setRadioList}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CairDetailed;
