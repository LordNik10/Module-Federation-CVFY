import React from 'react';
import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        main: React.CSSProperties['color'];
        contrastText?: React.CSSProperties['color'];
      };
      secondary: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      error: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      warning: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      success: {
        main: React.CSSProperties['color'];
        contrastText?: React.CSSProperties['color'];
      };
      info: {
        main: React.CSSProperties['color'];
        contrastText?: React.CSSProperties['color'];
      };
      bgDark: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      bglight: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
    };
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
      };
      up: (key: string) => string;
    };
  }

  export interface PaletteOptions {
    bgDark?: PaletteColorOptions;
    bgLight?: PaletteColorOptions;
  }

  interface PaletteColor {
    darker?: string;
  }

  interface Palette {
    bgDark: PaletteColor;
    bgLight: PaletteColor;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface BreakpointOverrides {
    xxl: true;
  }

  interface ThemeOptions {
    palette: {
      primary: {
        main: React.CSSProperties['color'];
        contrastText?: React.CSSProperties['color'];
      };
      secondary: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      error: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      warning: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      success: {
        main: React.CSSProperties['color'];
        contrastText?: React.CSSProperties['color'];
      };
      info: {
        main: React.CSSProperties['color'];
        contrastText?: React.CSSProperties['color'];
      };
      bgDark: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      bgLight: {
        main: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
    };
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
      };
    };
  }
}
