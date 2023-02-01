import React from 'react';
import { Card, Stack, Typography, Grid } from '@mui/material';
import Box from 'common/components/MUIOverride/Box';
import { useAuthContext } from 'features/auth/context/AuthContext';

function Profile() {
  const { userInfo } = useAuthContext();
  // eslint-disable-next-line
  const { firstName, lastName, username, role, tokenExpirationDate } = userInfo;

  const timeZoneMSec = new Date().getTimezoneOffset() * 60 * 1000;
  const parsedDate = Date.parse(tokenExpirationDate).valueOf() + -timeZoneMSec;
  const formattedDate = new Date(parsedDate).toLocaleString('it-IT');
  return (
    <Box
      size={'xxl' as 'lg'}
      sx={{
        align: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
      }}
    >
      <Card raised>
        <Grid container rowSpacing={3} px={5} py={3}>
          <Grid item xs={12}>
            <Typography variant="h1" align="center" mt={1} mb={5}>
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography component="strong">Name:</Typography>
              <Typography>{firstName}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography component="strong">Surname:</Typography>
              <Typography>{lastName}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography component="strong">Role:</Typography>
              <Typography>{role.toUpperCase()}</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography component="strong">Username:</Typography>
              <Typography>{username}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} justifyContent="center" mt={3}>
            <Stack>
              <Typography variant="body2" textAlign="center">
                Session expiration date: {formattedDate}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Profile;
