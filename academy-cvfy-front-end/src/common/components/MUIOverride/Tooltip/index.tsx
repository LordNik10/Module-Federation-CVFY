import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { theme } from 'theme/theme';

interface IToolTip {
  className: string | undefined;
}

function createTooltip(color: keyof typeof theme.palette) {
  return styled(({ className, ...props }: IToolTip) => (
    <MuiTooltip {...props} classes={{ popper: className }} title="hello">
      <div />
    </MuiTooltip>
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette[color].main,
      color: theme.palette[color].contrastText,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette[color].main,
    },
  });
}

const Tooltip = {
  Error: createTooltip('error'),
  Warning: createTooltip('warning'),
  Info: createTooltip('bgDark'),
};

export default Tooltip;
