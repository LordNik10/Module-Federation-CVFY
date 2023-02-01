import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import logo from 'assets/images/BitrockLogo.svg';

interface IBitrockLogo {
  logoWidth: number | string;
  widthChangeScreen: number;
}

const sxStyle = {
  mr: 2,
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'white',
  textDecoration: 'none',
  fontSize: '25px',
  marginLeft: '3%',
};

function BitrockLogo({
  logoWidth,
  widthChangeScreen,
  ...others
}: IBitrockLogo) {
  const [showText, setShowText] = useState<boolean>();
  const [widthScreen, setWidthScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidthScreen(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    setShowText(widthScreen > widthChangeScreen && true);
  }, [widthScreen, widthChangeScreen]);

  return (
    <>
      <img src={logo} alt="logo" width={logoWidth} {...others} />
      {showText && (
        <Typography variant="h5" noWrap component="h2" sx={sxStyle}>
          <RouterLink
            to="/"
            style={{ textDecoration: 'none', color: '#eb6400' }}
          >
            CVFY
          </RouterLink>
        </Typography>
      )}
      {!showText && (
        <Typography
          variant="h5"
          noWrap
          component="h2"
          sx={{ sxStyle, display: { xs: 'flex', md: 'none' } }}
        >
          <RouterLink
            to="/"
            style={{ textDecoration: 'none', color: '#eb6400' }}
          >
            CVFY
          </RouterLink>
        </Typography>
      )}
    </>
  );
}

export default BitrockLogo;

BitrockLogo.defaultProps = {
  logoWidth: '',
  widthChangeScreen: '',
};

BitrockLogo.propTypes = {
  logoWidth: PropTypes.string,
  widthChangeScreen: PropTypes.number,
};
