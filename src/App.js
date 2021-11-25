/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
//Toast notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// jss components
import { create } from "jss";

// jss-rtl components
import rtl from "jss-rtl";

// @mui style components
import { StylesProvider, jssPreset } from "@mui/styles";

// @mui material components
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from "context";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { useHistory } from './store/_helpers'
import { connect } from 'react-redux';
import { history } from "./store/_helpers"
import { alertActions } from "./store/_actions"
import { PrivateRoute } from "./store/_components"
import { useDispatch, useSelector } from 'react-redux';

export default function App(props) {
  const [controller, dispatch] = useSoftUIController();
  const { direction, layout, openConfigurator } = controller;
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const alert = useSelector(state => state.alert);
  const routeDispatch = useDispatch();
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      routeDispatch(alertActions.clear());
    });
  }, []);

  if (alert && alert.message) {
    toast.error(alert.message)
  }
  // JSS presets for the rtl
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      prepend: true,
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        // console.log("route is ", route.route)
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      backgroundColor="white"
      boxShadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      customClass="cursor-pointer"
      onClick={handleConfiguratorOpen}
    >
      <Icon className=" text-dark" fontSize="default">
        settings
      </Icon>
    </SuiBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={themeRTL}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav routes={routes} />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Switch>

            {getRoutes(routes)}
            {/* <Redirect from="*" to="/authentication/sign-in" /> */}
            {!localStorage.getItem('user') ?
              (<Redirect to="/authentication/sign-in" />) : <Redirect from="*" to="/dashboard" />
            }
          </Switch>
          <ToastContainer />
        </ThemeProvider>
      </StylesProvider>
    </CacheProvider>
  ) : (
    // </CacheProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav routes={routes} />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {/* {!localStorage.getItem('user') ?? 
          (<Redirect to="/authentication/sign-in" />)
          } */}
          {getRoutes(routes)}

          {/* <Redirect from="*" to="/authentication/sign-in" /> */}
          {!localStorage.getItem('user') ?
              (<Redirect to="/authentication/sign-in" />) : <Redirect from="*" to="/dashboard" />
            }
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
