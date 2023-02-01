import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackBar } from 'features/snackbar/context';
import { Table } from 'features/table/components/Table/Table';
import { useAuthContext } from 'features/auth/context/AuthContext';
import { useCallFetch } from 'common/hooks/useFetch';
import { useModal } from 'features/modal/context';
import config from 'config/config';
import { roles } from 'common/constants';
import { useRoles } from 'features/roles/context';
import {
  IAccountData,
  IFormattedAccountInfo,
} from 'features/account/services/interfaces';
import { columns } from './utils';
import AccountConfirmDelete from '../AccountConfirmDelete';
import AccountForm, { IAllRoles } from '../AccountForm';

interface IPagination {
  totalPages: number;
  rowsPerPage: number;
  totalRows: number;
}

interface IObjectContent extends IAccountData {
  lastLogin: Date;
}

interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface IPageable {
  sort: ISort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface IFormattedAccountInfoContent extends IFormattedAccountInfo {
  content: IObjectContent[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: ISort;
  numberOfElements: number;
  first: boolean;
  empty: false;
}

function AccountTable({ callFetchAccount }: any) {
  const {
    userInfo: { role: userRole },
  } = useAuthContext();
  const { callFetch } = useCallFetch();
  const { modalOpen } = useModal();
  const allRoles = useRoles();
  const { setSnackBar } = useSnackBar();
  const [account, setAccount] = useState<IFormattedAccountInfoContent>(
    {} as IFormattedAccountInfoContent,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<IPagination>({
    totalPages: 1,
    rowsPerPage: 10,
    totalRows: 0,
  });

  const fetchDataTable: () => void = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await callFetch(`${config.apiUrls.account}?page=${page}`); // TODO: remove hardcoded page
      setAccount(res);
      setPage(res.pageable.pageNumber + 1);
      setPagination({
        totalPages: res.totalPages,
        rowsPerPage: res.pageable.pageSize,
        totalRows: res.totalElements,
      });
    } catch (error) {
      console.error(error);
      setSnackBar({
        message: 'An error has occurred while fetching account list',
        type: 'error',
      });
    }
    setIsLoading(false);
  }, [setIsLoading, callFetch, setSnackBar, setAccount, page, setPage]);

  const handleDeleteAccount = (dataAccount: IAccountData) => {
    modalOpen({
      isModalOpen: true,
      title: 'Delete account',
      content: (
        <AccountConfirmDelete
          dataAccount={dataAccount}
          onSuccess={fetchDataTable}
        />
      ),
      disableClosing: true,
      maxWidth: 'md',
      isPending: false,
    });
  };

  const handleUpdateAccount = (dataAccount: IAccountData) => {
    modalOpen({
      isModalOpen: true,
      title: 'Update account',
      content: (
        <AccountForm
          allRoles={allRoles as IAllRoles[]}
          dataAccount={dataAccount}
          onSuccess={fetchDataTable}
          isUpdating
        />
      ),
      disableClosing: true,
      maxWidth: 'md',
      isPending: false,
    });
  };

  const handleCreateAccount = () => {
    modalOpen({
      isModalOpen: true,
      title: 'Create a new account',
      content: (
        <AccountForm
          allRoles={allRoles as IAllRoles[]}
          onSuccess={fetchDataTable}
          isUpdating={false}
        />
      ),
      disableClosing: true,
      maxWidth: 'md',
      isPending: false,
    });
  };

  const actionButtons = [
    {
      renderCell: (row: any) => (
        <MenuItem
          onClick={() => {
            handleUpdateAccount(row);
          }}
          id={`${row.id}-edit`}
          key={`${row.id}-edit`}
          sx={{ display: 'flex', flexDirection: 'row' }}
          disabled={userRole === 'dev'}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      ),
    },
    {
      renderCell: (row: IAccountData) => (
        <MenuItem
          onClick={() => {
            handleDeleteAccount(row);
          }}
          id={`${row.id}-delete`}
          key={`${row.id}-delete`}
          sx={{ display: 'flex', flexDirection: 'row' }}
          disabled={userRole === 'dev'}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      ),
    },
  ];

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable, page, callFetchAccount]);

  return (
    <>
      {userRole === roles.hr && (
        <Stack direction="column" alignItems="flex-start" width="100%" mb={3}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleCreateAccount}
          >
            Create New
          </Button>
        </Stack>
      )}
      <Table
        data={account.content}
        headers={columns}
        isStriped
        hasPagination
        isLoading={isLoading}
        actionButtons={actionButtons}
        pageCurrent={page - 1}
        setPage={setPage}
        pageTotal={pagination.totalPages}
        rowsPerPage={pagination.rowsPerPage}
        rowsTotal={pagination.totalRows}
      />
    </>
  );
}

export default AccountTable;

AccountTable.defaultProps = {
  callFetchAccount: () => {},
};

AccountTable.propTypes = {
  callFetchAccount: PropTypes.func,
};
