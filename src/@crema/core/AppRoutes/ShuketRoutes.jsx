import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import AppDisplayEdit from '../../../modules/ShuketComponents/MartComponents/AppDisplay/edit';

const SalesCollection = React.lazy(() => import('../../../modules/ShuketComponents/SalesCollection'));

const SalesCollectionAddMart = React.lazy(() => import('../../../modules/ShuketComponents/SalesCollection/add-mart'));

const ImportProduct = React.lazy(() => import('../../../modules/ShuketComponents/ImportProduct'));

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
    path: '/service/import-product',
    element: <ImportProduct />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-builder',
    element: <AppDisplay />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-builder?action?type=edi',
    element: <AppDisplayEdit />,
  },
];
