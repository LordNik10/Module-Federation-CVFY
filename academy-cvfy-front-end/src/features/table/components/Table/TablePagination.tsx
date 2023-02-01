import React from 'react';
import { TablePagination as TablePaginationMui } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTable } from 'features/table/context';
import Box from '../../../../common/components/MUIOverride/Box';

function TablePaginationActions() {
  const { setPage, pageCurrent, isLoading, pageTotal } = useTable();

  const handleFirstPageButtonClick = () => {
    setPage?.(1);
  };

  const handleBackButtonClick = () => {
    setPage?.((prevPage) => prevPage - 1);
  };

  const handleNextButtonClick = () => {
    setPage?.((prevPage) => prevPage + 1);
  };

  const handleLastPageButtonClick = () => {
    setPage?.(pageTotal ?? 0);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={isLoading || pageCurrent === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={isLoading || pageCurrent === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={isLoading || pageCurrent === (pageTotal ?? 1) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={isLoading || pageCurrent === (pageTotal ?? 1) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

export function TablePagination() {
  const {
    pageCurrent,
    rowsPerPage,
    setRowsPerPage,
    setPage,
    rowsTotal,
    hasAutoSlice,
  } = useTable();

  // TODO

  const handleChangePage = (_event: any, newPage: number) => {
    setPage?.(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent) => {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    setRowsPerPage?.(+value);
    setPage?.(0);
  };

  return (
    <TablePaginationMui
      sx={{ height: 60 }}
      component="div"
      rowsPerPageOptions={
        !hasAutoSlice ? [5, 10, 25, { label: 'All', value: -1 }] : [rowsPerPage]
      }
      count={rowsTotal ?? 0}
      rowsPerPage={rowsPerPage}
      page={pageCurrent}
      SelectProps={{
        inputProps: {
          'aria-label': 'rows per page',
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
}
