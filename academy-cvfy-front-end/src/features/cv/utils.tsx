import { Typography, Chip } from '@mui/material';
import { ITable } from 'features/table/components/Table/Table';
import React, { ReactNode } from 'react';

interface ICvRow {
  name: string;
  surname: string;
  file: any;
  role: string;
  statusCv: string;
  skills: { id: number; name: string }[];
  assignedTo: string;
}

export const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const columns: ITable['headers'] = [
  {
    id: 'id',
    label: 'Id',
    hidden: true,
    minWidth: '30px',
    maxWidth: '30px',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Nome',
    align: 'center',
    minWidth: '110px',
    maxWidth: '110px',
  },
  {
    id: 'surname',
    label: 'Cognome',
    align: 'center',
    minWidth: '110px',
    maxWidth: '110px',
  },
  {
    id: 'file',
    label: 'File CV',
    renderCell: (row) => (
      <Typography
        component="a"
        href={row as string}
        target="_blank"
        rel="noreferrer"
      >
        CV Candidato
      </Typography>
    ),
    align: 'center',
    minWidth: '100px',
    maxWidth: '100px',
  },
  {
    id: 'uploadDate',
    label: 'Data caricamento',
    renderCell: (row) => new Date(`${row}`).toLocaleString('it-IT', options),
    align: 'center',
    minWidth: '50px',
    maxWidth: '50px',
  },
  {
    id: 'status',
    label: 'Status CV',
    renderCell: (row) => {
      let color: 'success' | 'info' | 'error' | 'warning' | 'info';
      switch (row) {
        case 'assigned':
          color = 'success';
          break;
        case 'passed':
          color = 'info';
          break;
        case 'rejected':
          color = 'error';
          break;
        case 'pending':
          color = 'warning';
          break;
        default:
          color = 'info';
      }
      return <Chip color={color} label={row as ReactNode} />;
    },
    align: 'center',
    minWidth: '80px',
    maxWidth: '80px',
  },
  {
    id: 'skills',
    label: 'Skills',
    renderCell: (row) =>
      (row as { id: number; name: string }[])
        .map((skill) => skill.name)
        .join(', '),
    align: 'left',
    minWidth: '150px',
    maxWidth: '150px',
  },
  {
    id: 'account',
    label: 'Preso in carico da',
    renderCell: (row) => {
      if ((row as ICvRow).name !== 'n.a') {
        return `${(row as ICvRow).name} ${(row as ICvRow).surname} ${
          (row as ICvRow).role
        }`;
      }
      return null;
    },
    align: 'left',
    minWidth: '130px',
    maxWidth: '130px',
  },
];
