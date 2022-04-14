import { Box, Button, Input } from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $changeLogin,
  $changePassword,
  $login,
  $password,
  $submitForm,
} from '../features/auth/auth.model';

const Login = () => {
  const password = useStore($password);
  const login = useStore($login);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Box className="flex flex-col max-w-md gap-4 p-4 rounded shadow">
        <h1 className="m-0 text-3xl text-center">Liquidation</h1>

        <Input
          type="text"
          className="block"
          placeholder="Email или телефон"
          value={login}
          onChange={(e) => $changeLogin(e.target.value)}
        />
        <Input
          type="text"
          className="block"
          placeholder="Пароль"
          value={password}
          onChange={(e) => $changePassword(e.target.value)}
        />

        <Button onClick={() => $submitForm()}>Войти</Button>
      </Box>
    </div>
  );
};

export default Login;
