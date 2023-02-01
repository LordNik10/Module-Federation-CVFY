import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Toaster from 'features/snackbar/components/Toaster';
import config from 'config/config';
import CustomModal from 'features/modal/components/CustomModal';
import { useModal } from 'features/modal/context';
import AppBar from 'common/components/AppBar';
import { useScroll } from 'common/hooks/useScroll';
import { useScreen } from 'common/hooks/useScreen';
import { theme } from 'theme/theme';
import 'style/html-tag.scss';

function Layout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { modalInfo } = useModal();
  const pageContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll(pageContainer);
  const screen = useScreen();

  const getTopAppBar = () => {
    if (screen.width > theme.breakpoints.values.sm) {
      return 0;
    }
    return !scrollY.isScrollDown && screen.width < theme.breakpoints.values.sm
      ? 0
      : -config.appBarHeight;
  };

  return (
    <div
      id="page-container"
      ref={pageContainer}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <AppBar top={getTopAppBar()} height={config.appBarHeight} />
      <Container
        maxWidth={'xxl' as 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toaster
          time={config.snackbar.time}
          position={config.snackbar.position}
        />
        {children}
      </Container>
      {modalInfo.isModalOpen && <CustomModal />}
    </div>
  );
}

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
