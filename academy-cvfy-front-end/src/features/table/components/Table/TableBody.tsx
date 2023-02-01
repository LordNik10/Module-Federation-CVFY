import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';
import {
  TableCell,
  TableRow,
  Typography,
  CircularProgress,
  TableBody as MuiTableBody,
} from '@mui/material';
import { useTable } from 'features/table/context';
import { theme } from 'theme/theme';
import Menu from '../../../../common/components/MUIOverride/Menu';

function TableBody({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const {
    headers,
    data,
    isStriped,
    isLoading,
    actionButtons,
    typeStriped = 'even',
    messageNoData = 'No data.',
    rowsPerPage,
    pageCurrent,
    hasAutoSlice,
  } = useTable();

  const StyledTableRow = styled(TableRow)(() => ({
    [`&:nth-of-type(${typeStriped})`]: {
      backgroundColor: theme.palette.secondary.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const TableRowComponent = isStriped ? StyledTableRow : TableRow;
  // gestire con eventuali check
  const rowsButtons = data?.slice(
    pageCurrent * rowsPerPage,
    pageCurrent * rowsPerPage + rowsPerPage,
  );
  const rows = !hasAutoSlice ? rowsButtons : data;

  return (
    <MuiTableBody>
      {!isLoading &&
        rows?.map((row) => (
          <TableRowComponent
            key={row?.id}
            sx={isLoading ? { filter: 'grayscale(70%)' } : {}}
          >
            {headers.map(
              (col) =>
                col.hidden !== true && (
                  <TableCell
                    sx={{
                      width: col.width,
                      minWidth: col.minWidth,
                      maxWidth: col.maxWidth,
                    }}
                    align={col.align ?? 'left'}
                    key={`${row.id}-${col.id}`}
                  >
                    <>
                      {col.renderCell && col.renderCell(row[col.id])}
                      {!col.renderCell && row[col.id]}
                    </>
                  </TableCell>
                ),
            )}
            {actionButtons && actionButtons.length > 0 && (
              <TableCell sx={{ width: 5 }} align="center">
                <Menu options={actionButtons} row={row} />
              </TableCell>
            )}
          </TableRowComponent>
        ))}
      {rows?.length === 0 && !isLoading && (
        <TableRow>
          <TableCell colSpan={headers?.length}>
            <Typography align="center">{messageNoData}</Typography>
          </TableCell>
        </TableRow>
      )}
      {isLoading && (
        <TableRow>
          <TableCell colSpan={headers?.length} align="center">
            <CircularProgress sx={{ margin: 'auto' }} />
          </TableCell>
        </TableRow>
      )}
      {children}
    </MuiTableBody>
  );
}

TableBody.defaultProps = {
  children: null,
};

TableBody.propTypes = {
  children: PropTypes.node,
};

export default TableBody;
