import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { Button, Tooltip } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeToken } from '../../fetch/fetch-client';
import { AppDispatch } from '../../store';
import { logout } from '../../store/loginReducer';
import { destroyLoginData } from './login-utils';

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onClick = () => {
    if (confirm('Möchtest du dich wirklich abmelden?')) {
      dispatch(logout());
      destroyLoginData();
      removeToken();
      navigate('/login');
    }
  };

  return (
    <Tooltip title="Abmelden">
      <Button disableElevation variant="contained" onClick={onClick} endIcon={<LogoutIcon />}>
        Abmelden
      </Button>
    </Tooltip>
  );
}
