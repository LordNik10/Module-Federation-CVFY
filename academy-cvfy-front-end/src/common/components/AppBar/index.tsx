import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthContext } from 'features/auth/context/AuthContext';
// import useActiveRoutes from 'common/hooks/useActiveRoutes';
// import { useCallFetch } from 'common/hooks/useFetch/index';
// import config from 'config/config';
// import { tokenService } from 'features/auth/services';
import { theme } from 'theme/theme';
// import BitrockLogo from 'common/components/BitrockLogo';
// import { useAuth } from 'features/auth/hooks/useAuth';

const linkMenuWidth = 158;

interface IAppBar {
  top: number;
  height: number;
}

function AppBar({ top, height }: IAppBar) {
  // const routes = useActiveRoutes();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  // const { logoutUser } = useAuth();
  // const { callFetch } = useCallFetch();

  const { isLogged, userInfo } = useAuthContext();

  // const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // async function logoutHandler() {
  //   await callFetch(config.apiUrls.logout);
  // }

  // const handleLogout = () => {
  //   logoutHandler();
  //   handleLogin(false);
  //   tokenService.clearToken();
  //   navigate(config.routes.login);
  // };

  return (
    <MuiAppBar
      // color={'bgDark' as 'primary'}
      sx={{
        position: 'sticky',
        top,
        transition: 'top .3s ease-in',
        height,
      }}
    >
      <Container maxWidth={'xxl' as 'lg'} sx={{ height: '100%' }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            minHeight: '64px',
          }}
        >
          {/* <BitrockLogo
            logoWidth={theme.spacing(4)}
            widthChangeScreen={theme.breakpoints.values.md}
          /> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isLogged ? 'Open settings' : ''}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {isLogged && (
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    {userInfo.firstName?.charAt(0).toLocaleUpperCase()}
                  </Avatar>
                )}
                {!isLogged && <AccountCircleIcon fontSize="large" />}
              </IconButton>
            </Tooltip>
            {isLogged && (
              <Menu
                sx={{ mt: 5 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {routes.map((route) => (
                  <RouterLink
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                    }}
                    to={route.path}
                    key={route.id}
                  >
                    <MenuItem disableGutters onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{ width: linkMenuWidth }}
                        textAlign="center"
                        className="menu-user-items"
                      >
                        {route.label}
                      </Typography>
                    </MenuItem>
                  </RouterLink>
                ))} */}
                <Divider />
                <MenuItem disableGutters onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ width: linkMenuWidth }}
                    textAlign="center"
                    // onClick={logoutUser}
                    className="menu-user-items"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

AppBar.defaultProps = {
  top: 0,
  height: 64,
};

AppBar.propTypes = {
  top: PropTypes.number,
  height: PropTypes.number,
};

export default AppBar;
