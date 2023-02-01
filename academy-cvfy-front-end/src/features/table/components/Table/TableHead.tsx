import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead as MuiTableHead, TableRow } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useTable } from 'features/table/context';

interface ITableHead {
  children: React.ReactNode | React.ReactNode[];
}
function TableHead({ children }: ITableHead) {
  const { headers, actionButtons } = useTable();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.bgDark.main,
      color: theme.palette.bgDark.contrastText,
    },
  }));

  return (
    <>
      <MuiTableHead>
        <TableRow>
          {headers?.map(
            (head) =>
              head.hidden !== true && (
                <StyledTableCell align={head.align ?? 'left'} key={head.id}>
                  {head.label}
                </StyledTableCell>
              ),
          )}
          {actionButtons && actionButtons.length > 0 && (
            <StyledTableCell>Actions</StyledTableCell>
          )}
        </TableRow>
      </MuiTableHead>
      {children}
    </>
  );
}

TableHead.defaultProps = {
  children: null,
};

TableHead.propTypes = {
  children: PropTypes.node,
};

export default TableHead;
