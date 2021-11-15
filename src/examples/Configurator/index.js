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

import { useState, useEffect } from "react";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Custom styles for the Configurator
import styles from "examples/Configurator/styles";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

function Configurator() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const classes = styles({ sidenavColor });
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: false });
  };

  const handleTransparentSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: true });
  };

  const handleWhiteSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: false });
  };

  const handleFixedNavbar = () => {
    dispatch({ type: "FIXED_NAVBAR", value: !fixedNavbar });
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.configurator, {
          [classes.configurator_open]: openConfigurator,
          [classes.configurator_close]: !openConfigurator,
        }),
      }}
    >
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SuiBox>
          <SuiTypography variant="h5">Soft UI Configurator</SuiTypography>
          <SuiTypography variant="body2" textColor="text">
            See our dashboard options.
          </SuiTypography>
        </SuiBox>

        <Icon
          className={`font-bold ${classes.configurator_close_icon}`}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SuiBox>

      <Divider />
    </Drawer>
  );
}

export default Configurator;
