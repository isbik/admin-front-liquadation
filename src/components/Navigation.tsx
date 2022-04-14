import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/auth.model';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box className="flex items-center gap-4 p-4" bgColor={'lightblue'}>
      <NavLink to="/categories">Категории</NavLink>
      <NavLink to="/applications">Заявки</NavLink>
      <NavLink to="/users">Пользователи</NavLink>

      <Button onClick={handleLogout} className="ml-auto">
        Выйти
      </Button>
    </Box>
  );
};

export default Navigation;
