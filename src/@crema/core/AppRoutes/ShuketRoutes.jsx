import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const SalesCollection = React.lazy(() => import('../../../modules/ShuketComponents/SalesCollection'));

const SalesCollectionAddMart = React.lazy(() => import('../../../modules/ShuketComponents/SalesCollection/add-mart'));

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
];
