import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { TEXT_COLOR } from '@/layouts/constant';
import WrapCollapse from './WrapCollapse';

const useStyles = makeStyles((theme) => ({
  root: {},
}));
const STATUS_COLORS = {
  OPEN: '#34B108',
  CLOSED: '#F96A6A',
  REOPEN: '#0F81C0',
};
function RequestStatus({ data }) {
  const classes = useStyles();
  return (
    <WrapCollapse title="Request Status">
      <Grid container>
        <Grid style={{ margin: '0px' }} item xs={12} md={12}>
          <TableContainer
            component={Paper}
            style={{
              height: 300,
              width: '100%',
              overflowX: 'hidden',
              borderBottom: `1px solid #E5E5E5`,
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead style={{ backgroundColor: '#EDF4FB' }}>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: 14,
                      color: TEXT_COLOR.BLUE.BLUE1,
                      fontWeight: 600,
                    }}
                  >
                    Create Date
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: 14,
                      color: TEXT_COLOR.BLUE.BLUE1,
                      fontWeight: 600,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{
                        fontSize: 14,
                        color: TEXT_COLOR.BLUE.BLUE1,
                        borderBottom: 'none',
                      }}
                      align="left"
                    >
                      {row.createdAt}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: 500,
                        color: STATUS_COLORS[row.status],
                        borderBottom: 'none',
                      }}
                      align="left"
                    >
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </WrapCollapse>
  );
}

export default RequestStatus;
