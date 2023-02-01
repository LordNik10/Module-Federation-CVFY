import { createContext, useContext } from 'react';
import { ITable } from 'features/table/components/Table/Table';

interface ITableContext extends ITable {
  typeStriped?: string;
  messageNoData?: string;
}

// union ITable e typestriped messageNoData
export const TableContext = createContext<ITableContext>({
  data: [],
  headers: [],
  sizeTable: 'xs',
  pageCurrent: 0,
  rowsPerPage: 0,
  hasAutoSlice: false,
});

export function useTable() {
  return useContext(TableContext);
}
