import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useSnackBar } from 'features/snackbar/context';

interface IToasterProps {
  time: number;
  position: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

function Toaster({ time, position }: IToasterProps) {
  const { message, type, setSnackBar } = useSnackBar();
  // TODO
  const handleCloseSnackbar = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({ message: '', type: 'success' });
  };

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={time}
      anchorOrigin={position}
      onClose={handleCloseSnackbar}
    >
      <Alert severity={type}>{message ? <span>{message}</span> : null}</Alert>
    </Snackbar>
  );
}

Toaster.defaultProps = {
  position: {},
  time: 0,
};

Toaster.propTypes = {
  position: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
  time: PropTypes.number,
};

export default Toaster;
