import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'features/table/components/Table/Table';
import config from 'config/config';
import { useCvTable } from 'features/cv/hooks/useCvTable';
import { columns } from 'features/cv/utils';

interface ICvTable {
  filter: { [key: string]: number };
  onPageChange: (param: number) => void;
}

function CvTable({ filter, onPageChange }: ICvTable) {
  // const callFetch = useCallFetch();
  // const { setSnackBar } = useSnackBar();
  // const [isLoading, setIsLoading] = useState(false);
  // const [cv, setCv] = useState({});
  const [page, setPage] = useState(filter.page);
  const { fetchDataTable, cv, isLoading, pagination } = useCvTable();
  // const [pagination, setPagination] = useState({
  //   totalPages: 1,
  //   rowsPerPage: 10,
  //   totalRows: 0,
  // });
  // test
  const fetchOptions = useMemo(
    () => ({
      method: 'POST',
      body: {
        ...filter,
      },
    }),
    [filter],
  );

  // const fetchDataTable = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await callFetch(
  //       config.apiUrls.curriculumSearch,
  //       fetchOptions,
  //     );
  //     setCv(res);
  //     setPagination({
  //       totalPages: res.totalPages,
  //       rowsPerPage: res.pageable.pageSize,
  //       totalRows: res.totalElements,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     setSnackBar('An error has occurred while fetching CV list', 'error');
  //   }
  //   setIsLoading(false);
  // }, [setIsLoading, callFetch, setSnackBar, setCv, fetchOptions]);

  useEffect(() => {
    fetchDataTable(config.apiUrls.curriculumSearch, fetchOptions);
  }, [fetchDataTable, fetchOptions]);

  useEffect(() => {
    onPageChange(page);
  }, [onPageChange, page]);

  return (
    <Table
      data={cv}
      headers={columns}
      isStriped
      hasPagination
      isLoading={isLoading}
      pageCurrent={filter.page - 1}
      setPage={setPage}
      pageTotal={pagination.totalPages}
      rowsPerPage={pagination.rowsPerPage}
      rowsTotal={pagination.totalRows}
      hasAutoSlice
    />
  );
}

export default CvTable;

CvTable.defaultProps = {
  filter: {},
  onPageChange: () => {},
};

CvTable.propTypes = {
  filter: PropTypes.shape({
    page: PropTypes.number,
    skillsId: PropTypes.arrayOf(PropTypes.number),
    statusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onPageChange: PropTypes.func,
};
