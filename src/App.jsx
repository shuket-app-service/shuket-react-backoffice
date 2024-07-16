import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppContextProvider from "@crema/context/AppContextProvider";
import AppThemeProvider from "@crema/context/AppThemeProvider";
import AppStyleProvider from "@crema/context/AppStyleProvider";
import AppLocaleProvider from "@crema/context/AppLocaleProvider";
import InfoViewContextProvider from "@crema/context/AppContextProvider/InfoViewContextProvider";
import AppAuthProvider from "@crema/core/AppAuthProvider";
import AuthRoutes from "@crema/components/AuthRoutes";
import AppLayout from "@crema/core/AppLayout";
import "@crema/mockapi";
import "./styles/index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./modules/store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate  loading={null} persistor={persistor}>
          <AppContextProvider>
            <AppThemeProvider>
              <AppStyleProvider>
                <AppLocaleProvider>
                  <BrowserRouter>
                    <InfoViewContextProvider>
                      <AppAuthProvider>
                        <AuthRoutes>
                          <CssBaseline />
                          <AppLayout />
                        </AuthRoutes>
                      </AppAuthProvider>
                    </InfoViewContextProvider>
                  </BrowserRouter>
                </AppLocaleProvider>
              </AppStyleProvider>
            </AppThemeProvider>
          </AppContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
