import { IRoles } from 'features/roles/hooks/useGetAllRoles';
import { ITable } from 'features/table/components/Table/Table';

export const columns: ITable['headers'] = [
  {
    id: 'firstName',
    label: 'Name',
    align: 'center',
  },
  {
    id: 'lastName',
    label: 'Surname',
    align: 'center',
  },
  {
    id: 'email',
    label: 'Email',
    align: 'center',
  },
  {
    id: 'role',
    label: 'Role',
    align: 'center',
    renderCell: (row) => (row as IRoles).name,
  },
];
