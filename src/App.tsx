import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { $isAuthenticated, initAuthFx } from './features/auth/auth.model';
import Index from './pages';
import Categories from './pages/categories';
import Login from './pages/login';
import Users from './pages/users';

function App() {
  const isAuthenticated = useStore($isAuthenticated);

  useEffect(() => {
    initAuthFx();
  }, []);

  return (
    <Layout>
      <Routes>
        {!isAuthenticated && <Route path="/login" element={<Login />}></Route>}
        <Route path="/" element={<Index />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/applications" element={<Index />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
