import React from 'react';
import Account from 'pages/Account/Account';
import Dashboard from 'pages/Dashboard/Dashboard';
import Developer from 'pages/Developer/Developer';
import Hr from 'pages/Hr/Hr';
import Profile from 'pages/Profile/Profile';
import Skills from 'pages/Skills/Skills';
import Curriculum from 'pages/Curriculum/Curriculum';
import config from './config';

const routes = [
  {
    id: 1,
    path: config.routes.home,
    label: 'Dashboard',
    component: <Dashboard />,
    orderNum: 3,
    canHrAccess: true,
    canDevAccess: true,
  },
  {
    id: 2,
    path: config.routes.profile,
    label: 'Profile',
    component: <Profile />,
    orderNum: 4,
    canHrAccess: true,
    canDevAccess: true,
  },
  {
    id: 3,
    path: config.routes.account,
    label: 'Account',
    component: <Account />,
    orderNum: 1,
    canHrAccess: true,
    canDevAccess: true,
  },
  {
    id: 4,
    path: config.routes.developer,
    label: 'Developer',
    component: <Developer />,
    orderNum: 5,
    canHrAccess: false,
    canDevAccess: false,
  },
  {
    id: 5,
    path: config.routes.hr,
    label: 'Hr',
    component: <Hr />,
    orderNum: 5,
    canHrAccess: false,
    canDevAccess: false,
  },
  {
    id: 6,
    path: config.routes.skills,
    label: 'Skills',
    component: <Skills />,
    orderNum: 5,
    canHrAccess: true,
    canDevAccess: true,
  },
  {
    id: 7,
    path: config.routes.curriculum,
    label: 'Curriculum',
    component: <Curriculum />,
    orderNum: 2,
    canHrAccess: true,
    canDevAccess: true,
  },
];

export default routes;
