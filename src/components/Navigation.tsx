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
    <Box className="flex items-center gap-4 p-4 text-white bg-blue-700">
      <NavLink
        // className={(isActive) => (isActive ? ' font-bold' : '')}
        to="/categories"
      >
        Категории
      </NavLink>
      <NavLink
        // className={(isActive) => (isActive ? ' font-bold' : '')}
        to="/users"
      >
        Пользователи
      </NavLink>
      {/* <NavLink to="/applications">Заявки</NavLink> */}

      <Button onClick={handleLogout} className="ml-auto" colorScheme={'blue'}>
        Выйти
      </Button>
    </Box>
  );
};

export default Navigation;
