import { SearchOutlined, FilterList, AddOutlined } from '@mui/icons-material';
import {
  IconButton,
  InputBase,
  LinearProgress,
  Typography,
  Button,
} from '@mui/material';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import { DataGridPro, GridToolbar, useGridApiRef } from '@mui/x-data-grid-pro';
import useDebounce from 'hooks/common/useDebounce';
import { useGetRequestDataGrid } from 'hooks/queries/use-request-data-grid';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataGridStateAtom } from '@/recoil/atom/data-grid-state';
import ActionCustom from './ActionCustom';
import Progress from './Progress';
import Status from './Status';

export default function MuiDataGrid({ isLoading: initialLoading }) {
  const [pageSize, setPageSize] = useState(10);
  const [queryOptions, setQueryOptions] = useState({ sortModel: [] });
  const [page, setPage] = useState(0);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const [pinnedColumns, setPinnedColumns] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 700);
  const [rowCountState, setRowCountState] = useState(0);

  const setDataGridState = useSetRecoilState(dataGridStateAtom);
  const dataRequestStateValue = useRecoilValue(dataGridStateAtom);

  const navigate = useNavigate();

  const { isFetching } = useGetRequestDataGrid({
    options: {
      onSuccess: (res) => setDataGridState((prev) => ({ ...prev, data: res })),
    },
    params: {
      searchValue: debouncedSearch,
      limit: pageSize,
      page: page + 1,
      sort: queryOptions,
      //   visibilityColum: columnVisibilityModel,
    },
  });

  const {
    data: { dataGridSection = {} },
  } = dataRequestStateValue || {};
  // const dataGridSection = useMemo(
  //   () => dataRequestStateValue?.data?.dataGridSection || {},
  //   [dataRequestStateValue]
  // );
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      dataGridSection?.pagination?.totalRowCount !== undefined
        ? dataGridSection?.pagination?.totalRowCount
        : prevRowCountState
    );
  }, [dataGridSection?.pagination?.totalRowCount, setRowCountState]);
  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    setQueryOptions({ sortModel: [...sortModel] });
  }, []);

  useEffect(() => {
    if (dataGridSection?.columns?.length) {
      const formatPinnedColumns = dataGridSection.columns.reduce(
        (acc, cur) => {
          if (cur?.pinnedColumn === 'LEFT') {
            acc?.left.push(cur.field);
          }
          if (cur?.pinnedColumn === 'RIGHT') {
            acc?.right.push(cur.field);
          }
          return {
            ...acc,
          };
        },
        {
          left: [],
          right: [],
        }
      );
      setPinnedColumns(formatPinnedColumns);
    }
  }, [dataGridSection]);

  useEffect(() => {
    if (dataGridSection?.columns?.length) {
      const formatColumnVisibilityModel = dataGridSection.columns.reduce(
        (acc, cur) => {
          if (cur.hide) acc[cur.field] = false;
          return acc;
        },
        {}
      );
      setColumnVisibilityModel(formatColumnVisibilityModel);
    }
  }, [dataGridSection]);

  const handlePinnedColumnsChange = useCallback((updatedPinnedColumns) => {
    setPinnedColumns(updatedPinnedColumns);
  }, []);

  const apiRef = useGridApiRef();
  // console.log(apiRef.current.getRow());

  const formattedColumns = useCallback(() => {
    const columns = [...(dataGridSection?.columns || [])];
    return columns.map((column) => {
      switch (column.field) {
        case 'statusCustom':
          return {
            ...column,
            renderCell: (params) => {
              return <Status status={params?.value} />;
            },
          };
        case 'counterPartyCountry': {
          return {
            ...column,
            valueFormatter: (params) => {
              return `${params?.value?.label}`;
            },
            valueSetter: (params) => {
              return `${params?.value?.value}`;
            },
          };
        }
        case 'progress':
          return {
            ...column,
            renderCell: (params) => {
              return <Progress progress={params?.value} />;
            },
          };
        case 'dateCreated':
          return {
            ...column,
            valueFormatter: (params) => {
              return moment(params?.value).format('DD/MM/YYYY hh:mm');
            },
          };
        case 'actions':
          return {
            ...column,
            renderCell: (params) => (
              <ActionCustom rowId={params?.value} apiRef={apiRef} />
            ),
          };
        default:
          return {
            ...column,
            cellClassName: (params) => {
              return `${params?.row?.style?.fields?.[column.field]}` || '';
            },
          };
      }
    });
  }, [apiRef, dataGridSection?.columns]);

  const formattedRows = () => {
    const rows = [...(dataGridSection?.rows || [])];
    return rows.reduce((acc, row) => {
      return [
        ...acc,
        {
          ...row.data,
          style: {
            ...row.style,
          },
        },
      ];
    }, []);
  };

  const generatedClassRow = () => ({
    '& .rowStyle1': {
      bgcolor: '#EFFFFB',
    },
    '& .rowStyle2': {
      bgcolor: '#FBF7F7',
    },
    '& .rowStyle3': {
      bgcolor: '#FEFFDF',
    },
    '& .rowStyle4': {
      bgcolor: '#EFFFFD',
    },
  });

  const generatedClassCell = () => ({
    '& .cellStyle1': {
      backgroundColor: '#7A3779',
    },
    '& .cellStyle2': {
      bgcolor: '#6DECB9',
    },
    '& .cellStyle3': {
      bgcolor: '#12293E',
    },
  });

  const onNewRequest = () => {
    navigate('/data-request/data-sources');
  };

  return (
    <Box
      sx={{
        height: '700px',
        width: '100%',
        ...generatedClassRow(),
        ...generatedClassCell(),
      }}
    >
      <Typography className="heading-style">Data Requests</Typography>

      <div className="flex justify-between mb-10">
        <div>
          {!initialLoading && (
            <div className="flex">
              <Box
                sx={{
                  width: 500,
                }}
                className="border border-solid border-neutral-300 rounded"
              >
                <IconButton aria-label="menu">
                  <SearchOutlined className="fill-neutral-900" />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, width: '80%' }}
                  placeholder="Search"
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                  }}
                />
              </Box>

              <Button
                className="uppercase px-3 text-xs border-neutral-300 main-text ml-2"
                variant="outlined"
              >
                <FilterList className=" mr-1" />
                Filter
              </Button>
            </div>
          )}
        </div>

        <Button
          className="uppercase"
          variant="contained"
          color="primary"
          onClick={onNewRequest}
        >
          <AddOutlined className=" mr-1" />
          New Request
        </Button>
      </div>

      <DataGridPro
        className="border-0"
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        columns={formattedColumns()}
        rows={isFetching ? [] : formattedRows()}
        onStateChange={(state) => {
          // console.log('state', state);
        }}
        // pinnedColumns={pinnedColumns}
        // onPinnedColumnsChange={handlePinnedColumnsChange}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => {
          const isHideAll =
            Object.keys(newModel).length === dataGridSection?.columns?.length;
          setColumnVisibilityModel(
            isHideAll ? { ...newModel, rowStyle: false } : newModel
          );
          // setColumnVisibilityModel(newModel);
        }}
        apiRef={apiRef}
        loading={isFetching}
        disableSelectionOnClick
        rowCount={rowCountState}
        paginationMode="server"
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        getRowClassName={(params) => {
          return `${params?.row?.style?.rowStyleName}`;
        }}
      />
    </Box>
  );
}
