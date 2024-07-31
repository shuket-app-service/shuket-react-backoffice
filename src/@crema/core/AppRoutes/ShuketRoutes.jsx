import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import AppDisplayEdit from '../../../modules/ShuketComponents/MartComponents/AppDisplay/edit';
import AppDisplayEditAdd from '../../../modules/ShuketComponents/MartComponents/AppDisplay/AppDisplayEditAdd';
import ManagerImage from '../../../modules/ShuketComponents/ManagerImage';
import ManagerImageWithBarcode from '../../../modules/ShuketComponents/ManagerImage/WithBarcode';

const SalesCollection = React.lazy(() => import('../../../modules/ShuketComponents/SalesCollection'));

const SalesCollectionAddMart = React.lazy(() => import('../../../modules/ShuketComponents/SalesCollection/add-mart'));

const AppDisplay = React.lazy(() => import('../../../modules/ShuketComponents/MartComponents/AppDisplay'));

export const shuketConfigs = [
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/service/sales-collection',
    element: <SalesCollection />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/service/sales-collection/add-mart',
    element: <SalesCollectionAddMart />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/marts/general-images/list',
    element: <ManagerImage />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/marts/product-images-with-barcode/list',
    element: <ManagerImageWithBarcode />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-builder',
    element: <AppDisplay />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-builder/action',
    element: <AppDisplayEditAdd />,
  },
];
