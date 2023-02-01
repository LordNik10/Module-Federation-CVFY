import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Container, Stack, Button, Grid } from '@mui/material';
import { useModal } from 'features/modal/context';
import { useAccount } from 'features/account/hooks';
import { IAccountData } from 'features/account/services/interfaces';
import { AccountMethods } from '../../type';

export interface IAccountConfirmDelete {
  dataAccount: IAccountData;
  onSuccess: () => void;
}

function AccountConfirmDelete({
  dataAccount,
  onSuccess,
}: IAccountConfirmDelete) {
  // const { handleAccountDelete } = useAccountDelete();
  const { accountMethodFunction } = useAccount();

  const { modalClose } = useModal();

  return (
    <Container disableGutters maxWidth={false}>
      <Grid container spacing={2} rowSpacing={2} columns={2} direction="row">
        <Grid item xs={2}>
          <Typography component="span" margin={0}>
            Name: {dataAccount.firstName}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography component="span" margin={0}>
            Surname: {dataAccount.lastName}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Stack
            direction="row"
            spacing={2}
            width="100%"
            justifyContent="flex-end"
          >
            <Button
              style={{ marginTop: 5 }}
              type="button"
              variant="outlined"
              size="large"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button
              style={{ marginTop: 5 }}
              type="submit"
              variant="contained"
              size="large"
              onClick={() =>
                accountMethodFunction(
                  AccountMethods.Delete,
                  onSuccess,
                  dataAccount,
                )
              }
            >
              Delete
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AccountConfirmDelete;

AccountConfirmDelete.defaultProps = {
  dataAccount: null,
  onSuccess: () => {},
};

AccountConfirmDelete.propTypes = {
  dataAccount: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    id: PropTypes.number,
  }),
  onSuccess: PropTypes.func,
};
