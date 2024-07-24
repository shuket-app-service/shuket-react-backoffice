import React, { useEffect, useState } from 'react';
import { useUrlSearchParams } from 'use-url-search-params';
import AppContentView from '@crema/components/AppContentView';
import generateRoutes from '@crema/helpers/RouteGenerator';
import { Layouts } from '@crema/components/AppLayout';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '@crema/context/AppContextProvider/LayoutContextProvider';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import {
  anonymousStructure,
  authorizedStructure,
  publicStructure,
} from '../AppRoutes';
import { useRoutes } from 'react-router-dom';
// import routesConfig from '../AppRoutes/routeConfig';
import { initialUrl } from '@crema/constants/AppConst';
import { useDispatch, useSelector } from 'react-redux';
import { getLeftMenuBar } from '../../../modules/store/main/thunk';

const AppLayout = () => {
  const dispatch = useDispatch()
  const { navStyle } = useLayoutContext();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const [routesConfig, setRoutesConfig] = useState([])

  // const { user, isAuthenticated } = useAuthUser();
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const AppLayout = Layouts[navStyle];
  const [params] = useUrlSearchParams();

  const initURL = params?.redirect ? params?.redirect : initialUrl;
  // const loginUrl = `/signin?redirect=${window.location.pathname}`;
  const loginUrl = `/signin`;

  const generatedRoutes = generateRoutes({
    isAuthenticated: isAuthenticated,
    userRole: user?.role_list,
    anonymousStructure: anonymousStructure(initURL),
    authorizedStructure: authorizedStructure(loginUrl),
    publicStructure: publicStructure(initURL),
  });

  const routes = useRoutes(generatedRoutes);

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, [
    params.layout,
    params.menuStyle,
    params.sidebarImage,
    updateNavStyle,
    updateMenuStyle,
    setSidebarBgImage,
  ]);


  useEffect(()=>{
    async function fetchData() {
      const response = await dispatch(getLeftMenuBar());
      setRoutesConfig(response.payload);
    }
      if (token) {
        fetchData();
      }
      return () => { }
  },[token])
  
  return (
    <>
      {isAuthenticated ? (
        routesConfig.length > 0 && <AppLayout routes={routes} routesConfig={routesConfig} />
      ) : (
        <AppContentView routes={routes} />
      )}
    </>
  );
};

export default AppLayout;
