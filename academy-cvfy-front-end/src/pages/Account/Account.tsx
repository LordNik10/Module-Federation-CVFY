import React from 'react';
import { Typography } from '@mui/material';
import AccountTable from 'features/account/components/AccountTable';

function Account() {
  return (
    <>
      <Typography variant="h1">Account</Typography>
      <AccountTable />
    </>
  );
}
export default Account;
