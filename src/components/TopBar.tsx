import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';

import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logout from '../features/log-in-out/Logout';
import OfferActions from './OfferActions';

export default function TopBar() {
  const location = useLocation();
  const isRootLocation = location.pathname === '/';
  const isLoginLocation = location.pathname === '/login';

  const actions = useMemo(() => {
    if (location.pathname.startsWith('/offers/edit')) {
      return <OfferActions />;
    }
    if (isRootLocation) {
      return <Logout />;
    }
    return null;
  }, [location, isRootLocation]);

  const homeButton = useMemo(() => {
    if (isRootLocation || isLoginLocation) {
      return null;
    }

    return (
      <Link to="/">
        <IconButton>
          <HomeIcon />
        </IconButton>
      </Link>
    );
  }, [isRootLocation, isLoginLocation]);
  return (
    <Box flexGrow={1}>
      <AppBar position="fixed" elevation={0} variant="outlined" color="inherit">
        <Toolbar>
          {homeButton}
          <Box flex={1} display="flex" justifyContent={'flex-end'}>
            {actions}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
