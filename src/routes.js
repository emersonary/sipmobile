import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Home from './pages/Home';
import DashBoard from './pages/dashboard';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Home,
    DashBoard,
  }),
);
