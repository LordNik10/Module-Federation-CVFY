import React, { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table as MuiTable,
  TableCellProps,
} from '@mui/material';
import { TableContext } from 'features/table/context';
// import { IRoles } from 'common/hooks/useGetAllRoles';
import { Breakpoint } from '@mui/material/styles';
import { ISkillConfirmDelete } from 'features/skills/components/SkillsConfirmDelete';
import { TablePagination } from './TablePagination';
import Box from '../../../../common/components/MUIOverride/Box';
import TableHead from './TableHead';
import TableBody from './TableBody';

// type ITableDataKey<K extends string, V> = {
//   [key in K]: V;
// };

export interface ITableData {
  id: number;
  name?: string;
  surname?: string;
  file?: string;
  uploadDate?: Date;
  status?: string;
  skills?: {
    id: number;
    name: string;
  }[];
  account?: {
    name: string;
    surname: string;
    role: string;
  };
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: {
    id: number;
    name: string;
  };
  lastLogin?: Date;
}

export interface ITable {
  data: ITableData[];
  headers: {
    // cambiare string in ogni tipo di proprietà disponibile di data (type mapping)
    id: keyof ITableData;
    // eslint-disable-next-line no-undef
    label?: string | JSX.Element;
    align: TableCellProps['align'];
    hidden?: boolean;
    width?: number;
    minWidth?: number | string;
    maxWidth?: number | string;
    // cambiare any
    renderCell?: (
      row?:
        | string
        | number
        | Date
        | { id: number; name: string }[]
        | { name: string; surname: string; role: string }
        | { id: number; name: string }
        | ReactNode,
      // eslint-disable-next-line no-undef
    ) => string | JSX.Element | null;
  }[];
  isStriped?: boolean;
  hasPagination?: boolean;
  isLoading?: boolean;
  actionButtons?: {
    renderCell: (
      param: ISkillConfirmDelete['dataSkill'] | any,
    ) => React.ReactNode;
  }[];
  rowSizeVertical?: 'small' | 'medium';
  maxHeight?: string;
  height?: string;
  width?: string;
  dataPath?: string;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  sizeTable?: Breakpoint;
  pageCurrent: number;
  pageTotal?: number;
  rowsPerPage: number;
  setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  rowsTotal?: number;
  hasAutoSlice: boolean;
  sx?: {};
}

export function Table({
  data,
  headers,
  isStriped,
  hasPagination,
  isLoading,
  actionButtons,
  rowSizeVertical,
  maxHeight,
  height,
  width,
  dataPath,
  setPage,
  sizeTable,
  pageCurrent,
  pageTotal,
  rowsPerPage,
  setRowsPerPage,
  rowsTotal,
  hasAutoSlice,
  sx,
}: ITable) {
  const props = useMemo(
    () => ({
      data,
      headers,
      isStriped,
      isLoading,
      actionButtons,
      dataPath,
      setPage,
      pageCurrent,
      pageTotal,
      rowsPerPage,
      setRowsPerPage,
      rowsTotal,
      hasAutoSlice,
    }),
    [
      data,
      headers,
      isStriped,
      isLoading,
      actionButtons,
      dataPath,
      pageCurrent,
      setPage,
      pageTotal,
      rowsPerPage,
      setRowsPerPage,
      rowsTotal,
      hasAutoSlice,
    ],
  );

  return (
    <TableContext.Provider value={props}>
      <Box
        size={sizeTable ?? 'xs'}
        sx={{
          overflow: 'hidden',
          height: { height },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          width: { width },
          ...sx,
        }}
      >
        <TableContainer
          sx={{
            maxHeight: { maxHeight },
            height: '100%',
          }}
        >
          <MuiTable
            stickyHeader
            aria-label="sticky table"
            size={rowSizeVertical}
            sx={{ height: '100%' }}
          >
            {headers && <TableHead />}
            <TableBody />
          </MuiTable>
        </TableContainer>
        {hasPagination && <TablePagination />}
      </Box>
    </TableContext.Provider>
  );
}

Table.defaultProps = {
  data: [],
  isStriped: false,
  hasPagination: false,
  isLoading: false,
  actionButtons: [],
  rowSizeVertical: 'small',
  maxHeight: '100%',
  height: '100%',
  width: '100%',
  dataPath: '',
  setPage: () => {},
  pageCurrent: 0,
  sizeTable: 'xxl',
  sx: {},
  pageTotal: 1,
  rowsPerPage: 10,
  setRowsPerPage: () => {},
  rowsTotal: 1,
  hasAutoSlice: true,
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      lastLogin: PropTypes.string,
    }),
  ),

  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      align: PropTypes.string,
      renderCell: PropTypes.func,
    }),
  ).isRequired,
  isStriped: PropTypes.bool,
  hasPagination: PropTypes.bool,
  isLoading: PropTypes.bool,
  actionButtons: PropTypes.arrayOf(
    PropTypes.shape({
      renderCell: PropTypes.func,
    }),
  ),
  rowSizeVertical: PropTypes.string,
  maxHeight: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  dataPath: PropTypes.string,
  setPage: PropTypes.func,
  pageCurrent: PropTypes.number,
  sizeTable: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.object]),
  pageTotal: PropTypes.number,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
  rowsTotal: PropTypes.number,
  hasAutoSlice: PropTypes.bool,
};
