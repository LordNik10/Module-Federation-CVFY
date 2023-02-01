import React from 'react';
import PropTypes from 'prop-types';
import MuiBox from '@mui/material/Box';
import { Breakpoint } from '@mui/material/styles';
import { theme } from 'theme/theme';
/**
 * Represents a container to give a maximum width to the children element.
 * @param size - A dimension to be chosen between "sm", "md", "lg", "xl" and "xxl" (default value) for maxWidth.
 * @param gutter - A number which, multiplied by the theme.spacing value, returns a margin all around the Box (default is 0).
 * @param children - The children component to be injected in the Box component.
 * @param sx - The system prop that allows defining system overrides as well as additional CSS styles.
 * @param props - Props directly injected to the MuiBox element.
 * @returns {JSX.Element}
 * @constructor
 */

interface IBox {
  size?: Breakpoint;
  sx: {};
  gutter?: number;
  children: React.ReactNode;
  [x: string]: any;
}

function Box({ size, sx, gutter, children, ...props }: IBox) {
  const style = {
    margin: gutter ? theme.spacing(gutter) : 0,
    maxWidth: theme.breakpoints.values[size ?? 'xs'],
  };

  return (
    <MuiBox sx={{ ...style, ...sx }} {...props}>
      {children}
    </MuiBox>
  );
}

export default Box;

Box.defaultProps = {
  size: 'xl',
  gutter: 0,
  sx: null,
};

Box.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
  gutter: PropTypes.number,
  sx: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.object]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
