import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import AppDisplayEdit from '../../../modules/ShuketComponents/MartComponents/AppDisplay/edit';
import AppDisplayEditAdd from '../../../modules/ShuketComponents/MartComponents/AppDisplay/AppDisplayEditAdd';
import ManagerImage from '../../../modules/ShuketComponents/ManagerImage';
import ManagerImageWithBarcode from '../../../modules/ShuketComponents/ManagerImage/WithBarcode';
import ManagerImageWithoutBarcode from '../../../modules/ShuketComponents/ManagerImage/WithoutBarcode';
import Catalogs from '../../../modules/ShuketComponents/Catalogs';
import NoticeAdmin from '../../../modules/ShuketComponents/Notice/admin';
import NoticeApp from '../../../modules/ShuketComponents/Notice/app';
import SettingSite from '../../../modules/ShuketComponents/SettingSite';
import Fcm from '../../../modules/ShuketComponents/Fcm';
import AppVersion from '../../../modules/ShuketComponents/AppVersion';
import ImportProduct from '../../../modules/ShuketComponents/ImportProduct';
import ManagerAdminLevel from '../../../modules/ShuketComponents/ManagerAdmin/Level';
import ManagerAdminAccount from '../../../modules/ShuketComponents/ManagerAdmin/Account';
import FcmEdit from '../../../modules/ShuketComponents/Fcm/edit';
import PushManagerEditAdd from '../../../modules/ShuketComponents/MartComponents/PushManager/PushManagerEditAdd';
import PushManager from '../../../modules/ShuketComponents/MartComponents/PushManager';
import ProductManagerRegister from '../../../modules/ShuketComponents/MartComponents/ProductManager/ProductRegister';
import ProductManagerUnregister from '../../../modules/ShuketComponents/MartComponents/ProductManager/ProductUnregister';
import ManagerOrder from '../../../modules/ShuketComponents/ManagerOrder';

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
    path: '/sys-site/config-option',
    element: <SettingSite />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/service/fcm-management',
    element: <Fcm />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/service/fcm-management/edit-fcm',
    element: <FcmEdit />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/admin/account/list',
    element: <ManagerAdminAccount />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/admin/account/level',
    element: <ManagerAdminLevel />,
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
    path: '/marts/product-images-without-barcode/list',
    element: <ManagerImageWithoutBarcode />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/service/import-product',
    element: <ImportProduct />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/moa-notice',
    element: <NoticeAdmin />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/moa-notice-messages',
    element: <NoticeApp />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/admin/catalogs/list',
    element: <Catalogs />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/marts/manage-order-moa-service/list',
    element: <ManagerOrder />,
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
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-push',
    element: <PushManager />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-push/action',
    element: <PushManagerEditAdd />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/app-management/app-version',
    element: <AppVersion />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/marts/product/registered-list',
    element: <ProductManagerRegister />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: '/marts/product/unregister-list',
    element: <ProductManagerUnregister />,
  },
];
