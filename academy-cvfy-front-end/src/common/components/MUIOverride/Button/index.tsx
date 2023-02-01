import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button as MuiButton,
  CircularProgress,
  Stack,
} from '@mui/material';

function Button(props: any) {
  const { isloading, children, disabled, ...otherprops } = props;
  return (
    <MuiButton {...otherprops} disabled={isloading || disabled}>
      {isloading && (
        <Paper
          component={Stack}
          direction="column"
          justifyContent="center"
          sx={{
            position: 'absolute',
            inset: '0',
            filter: 'grayscale(100%) opacity(10%)',
            backgroundColor: 'blue',
          }}
        >
          <CircularProgress size={25} thickness={6} sx={{ margin: 'auto' }} />
        </Paper>
      )}
      {children}
    </MuiButton>
  );
}

export default Button;

Button.defaultProps = {
  children: null,
  isloading: false,
  disabled: false,
  // otherprops: null,
};

Button.propTypes = {
  children: PropTypes.string,
  isloading: PropTypes.bool,
  disabled: PropTypes.bool,
  // otherprops: PropTypes.objectOf(PropTypes.shape(PropTypes.string)),
};
