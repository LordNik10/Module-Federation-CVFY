import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Grid,
  Stack,
  Container,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import ListItem from 'common/components/ListItem/ListItem';
import { useModal } from 'features/modal/context';
import { useAccount } from 'features/account/hooks';
import {
  IAccountData,
  IFormattedAccountInfo,
} from 'features/account/services/interfaces';

export interface IAllRoles {
  id: number;
  name: string;
}

export interface IAccountForm {
  dataAccount: IAccountData;
  allRoles: IAllRoles[];
  onSuccess: () => void;
  isUpdating: boolean;
}

const accountInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  roleId: NaN,
  username: '',
};
function AccountForm({
  dataAccount,
  allRoles,
  onSuccess,
  isUpdating,
}: IAccountForm) {
  const { modalClose } = useModal();
  const { initializeAccountInfo, onSubmitAccountForm, onChangeAccount } =
    useAccount();

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [roleSelected, setRoleSelected] = useState<number | string>(
    dataAccount ? dataAccount.role.id : '',
  );
  const [accountInfo, setAccountInfo] =
    useState<IFormattedAccountInfo>(accountInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    initializeAccountInfo(dataAccount, setAccountInfo);
  }, [dataAccount, initializeAccountInfo]);

  const handleToggleShowPassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <form
      style={{
        width: '100%',
        height: '100%',
      }}
      onSubmit={(e) =>
        onSubmitAccountForm({
          e,
          accountInfo,
          dataAccount,
          accountInitialState,
          setIsPasswordValid,
          setRoleSelected,
          onSuccess,
          setAccountInfo,
          isUpdating,
        })
      }
    >
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2} rowSpacing={2} columns={2} direction="row">
          <Grid item xs={2} md={1}>
            <TextField
              label="Name"
              placeholder="Name"
              value={accountInfo.firstName}
              onChange={(e) => onChangeAccount(e, 'firstName', setAccountInfo)}
              required
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Surname"
              placeholder="Surname"
              value={accountInfo.lastName}
              onChange={(e) => onChangeAccount(e, 'lastName', setAccountInfo)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Email"
              placeholder="Email"
              type="email"
              value={accountInfo.email}
              onChange={(e) => onChangeAccount(e, 'email', setAccountInfo)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Password"
              placeholder="Password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={accountInfo.password}
              onChange={(e) => onChangeAccount(e, 'password', setAccountInfo)}
              helperText={
                !isPasswordValid &&
                'Password must contain at least 8 characters, one number and one letter'
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      aria-pressed={isPasswordVisible}
                      onClick={handleToggleShowPassword}
                      onMouseDown={handleToggleShowPassword}
                      edge="end"
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required={!isUpdating && true}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <ListItem
              onChange={(e) => onChangeAccount(e, 'firstName', setAccountInfo)}
              listItem={allRoles}
              label="Roles"
              width="100%"
              required
              onSelectedItem={setRoleSelected}
              selectedItem={roleSelected}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              spacing={2}
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
              >
                {isUpdating ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

export default AccountForm;

AccountForm.defaultProps = {
  dataAccount: null,
  allRoles: {},
  onSuccess: () => {},
  isUpdating: false,
};

AccountForm.propTypes = {
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
  allRoles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  onSuccess: PropTypes.func,
  isUpdating: PropTypes.bool,
};
