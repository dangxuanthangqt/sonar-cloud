import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { TEXT_COLOR } from '@/layouts/constant';
import { truncateString } from '@/common/utils';

function Row({ row }) {
  const [openCollapse, setOpenCollapse] = React.useState(false);
  return (
    <TableRow>
      <TableCell
        sx={{
          fontSize: 12,
          color: TEXT_COLOR.BLUE.BLUE1,
        }}
        align="right"
      >
        {row.date}
      </TableCell>
      <TableCell
        sx={{
          fontSize: 12,
          color: TEXT_COLOR.BLUE.BLUE1,
        }}
        align="left"
      >
        {row.firstName}
      </TableCell>
      <TableCell
        sx={{
          fontSize: 12,
          color: TEXT_COLOR.BLUE.BLUE1,
        }}
        align="left"
      >
        {row.lastName}
      </TableCell>
      <TableCell
        sx={{
          fontSize: 12,
          color: TEXT_COLOR.BLUE.BLUE1,
          textAlign: 'justify',
        }}
        align="right"
      >
        {!openCollapse ? truncateString(row.comment) : row.comment}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpenCollapse(!openCollapse)}
        >
          {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function CairTableDetailed({ data = [] }) {
  return (
    <TableContainer component={Paper} style={{ height: 450, width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ backgroundColor: '#0F81C0' }}>
          <TableRow>
            <TableCell
              sx={{ fontSize: 12 }}
              align="left"
              className="text-white"
            >
              Date
            </TableCell>
            <TableCell
              sx={{ fontSize: 12, minWidth: '60px' }}
              align="left"
              className="text-white"
            >
              First Name
            </TableCell>
            <TableCell
              sx={{ fontSize: 12, minWidth: '60px' }}
              align="left"
              className="text-white"
            >
              Last Name
            </TableCell>
            <TableCell
              sx={{ fontSize: 12 }}
              align="left"
              className="text-white"
            >
              Comment
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CairTableDetailed;
