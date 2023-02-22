import React from 'react';
import { useRoutes } from 'react-router-dom';

import Login from '../src/components/layouts/Login';
import Dashboard from './screens/Admin/Dashboard';
import Page404 from './components/layouts/Page404';


export default function Pages() {
  let element = useRoutes([
    //Users
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/',
      element: <Login />,
    },


    //404
    {
      path: '*',
      element: <Page404 />,
    },
  ]);
  return element;
}
