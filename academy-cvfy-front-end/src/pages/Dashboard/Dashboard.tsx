import React from 'react';
// import CvByUser from 'features/cv/components/CvByUser';
import { Typography } from '@mui/material';
// import config from 'config/config';
// import { useAuthContext } from 'features/auth/context/AuthContext';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // const { isLogged } = useAuthContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLogged) {
  //     navigate(config.routes.login);
  //   }
  // }, [isLogged, navigate]);
  return (
    <>
      <Typography variant="h1">Dashboard</Typography>
      {/* <CvByUser /> */}
    </>
  );
}

export default Dashboard;
