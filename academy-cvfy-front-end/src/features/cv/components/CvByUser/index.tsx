import { TableSortLabel, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import config from 'config/config';
import { useAuthContext } from 'features/auth/context/AuthContext';
import { useCvByUser } from 'features/cv/hooks/useCvByUser';
import Loader from 'common/components/Loader';
import { ITable, Table } from 'features/table/components/Table/Table';

function CvByUser() {
  const [listOrder, setListOrder] = useState({
    key: 'name',
    order: 'asc',
  });
  const { loadCvByUser, cvList, isLoading, setCvList } = useCvByUser();
  const { userInfo } = useAuthContext();
  const { username } = userInfo;

  useEffect(() => {
    if (username) {
      loadCvByUser(config.apiUrls.curriculumList);
    }
  }, [username, loadCvByUser]);

  const changeOrder = useCallback(() => {
    setCvList((prevCvList) => prevCvList.reverse());
    setListOrder((prevOrder) => ({
      ...prevOrder,
      order: listOrder.order === 'asc' ? 'desc' : 'asc',
    }));
  }, [listOrder, setListOrder, setCvList]);

  const handleSort = useCallback(
    (key = 'name') => {
      if (listOrder.key === key) {
        changeOrder();
      } else {
        setListOrder({
          key,
          order: 'asc',
        });
        setCvList((prevCvList) =>
          prevCvList.sort((a, b) => (a[key] > b[key] ? 1 : -1)),
        );
      }
    },
    [changeOrder, setListOrder, listOrder, setCvList],
  );

  const columns: ITable['headers'] = useMemo(
    () => [
      {
        id: 'name',
        label: (
          <TableSortLabel
            active={listOrder.key === 'name'}
            direction={listOrder.key === 'name' ? 'desc' : 'asc'}
            onClick={() => handleSort('name')}
          >
            Nome
          </TableSortLabel>
        ),
        align: 'left',
      },
      {
        id: 'surname',
        label: (
          <TableSortLabel
            active={listOrder.key === 'surname'}
            direction={listOrder.key === 'surname' ? 'desc' : 'asc'}
            onClick={() => handleSort('surname')}
          >
            Cognome
          </TableSortLabel>
        ),
        align: 'left',
      },
      {
        id: 'file',
        label: 'File CV',
        renderCell: (row: any) => (
          <Typography component="a" href={row} target="_blank" rel="noreferrer">
            CV Candidato
          </Typography>
        ),
        align: 'left',
      },
      {
        id: 'uploadDate',
        label: (
          <TableSortLabel
            active={listOrder.key === 'uploadDate'}
            direction={listOrder.key === 'uploadDate' ? 'desc' : 'asc'}
            onClick={() => handleSort('uploadDate')}
          >
            Data di caricamento
          </TableSortLabel>
        ),
        align: 'left',
        renderCell: (row: any) => {
          const timeZoneMSec = new Date().getTimezoneOffset() * 60 * 1000;
          // extrapolate expiration date into a useful format
          const parsedDate = Date.parse(row).valueOf() + -timeZoneMSec;
          return new Date(parsedDate).toLocaleString('en-GB');
        },
      },
      {
        id: 'status',
        label: (
          <TableSortLabel
            active={listOrder.key === 'status'}
            direction={listOrder.key === 'status' ? 'desc' : 'asc'}
            onClick={() => handleSort('status')}
          >
            Status
          </TableSortLabel>
        ),
        align: 'left',
      },
      {
        id: 'skills',
        label: 'Skills',
        renderCell: (row: any) =>
          row.map((skill: any) => skill.name).join(', '),
        align: 'left',
      },
      {
        id: 'account',
        label: undefined,
        align: undefined,
        hidden: true,
      },
    ],
    [handleSort, listOrder],
  );
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table data={cvList} headers={columns} isStriped isLoading={isLoading} />
  );
}

export default CvByUser;
