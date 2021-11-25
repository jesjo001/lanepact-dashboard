/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/_helpers';
import App from "App";
import { history } from "./store/_helpers"

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

ReactDOM.render(

  <Provider store={store}>
    <SoftUIControllerProvider>
      <Router history={history} >
        <App />
      </Router>
    </SoftUIControllerProvider>
  </Provider>
  ,
  document.getElementById("root")
);
