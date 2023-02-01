import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AuthProvider from 'features/auth/context/AuthContext';
import { theme } from 'theme/theme';
import CvStatusProvider from 'features/cv/context';
import SnackBarProvider from 'features/snackbar/context';
import { ModalContextProvider } from 'features/modal/context';
import CheckAuth from 'features/auth/context/CheckAuthContext';
import RolesProvider from 'features/roles/context';
import SkillsProvider from 'features/skills/context';

interface IProviderWrapper {
  children: React.ReactNode | React.ReactNode[];
}
function ProviderWrapper({ children }: IProviderWrapper) {
  return (
    <ThemeProvider theme={theme}>
      <ModalContextProvider>
        <AuthProvider>
          <Router>
            <CheckAuth>
              <SnackBarProvider>
                <SkillsProvider>
                  <RolesProvider>
                    <CvStatusProvider>{children}</CvStatusProvider>
                  </RolesProvider>
                </SkillsProvider>
              </SnackBarProvider>
            </CheckAuth>
          </Router>
        </AuthProvider>
      </ModalContextProvider>
    </ThemeProvider>
  );
}

ProviderWrapper.defaultProps = {
  children: null,
};

ProviderWrapper.propTypes = {
  children: PropTypes.element,
};

export default ProviderWrapper;
