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
import { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import MySuiDropdown from "components/MySuiDropdown";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
// import SuiButton from "components/SuiButton";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import { isEmail } from "validator";

//toast notification
import { toast } from 'react-toastify';
import { register } from "../../../components/Auth/AuthService";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userField, setUserField] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userExperienceLevel, setUserExperienceLevel] = useState("");
  const [yearInTech, setYearInTech] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();


  const [openMenu, setOpenMenu] = useState(null);
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleExperienceChange = () => {

  }
  const handleSubmitForm = () => {
    if (email === "") return toast.error("Email must be a vailid email")
    if (name === "" || name.length < 6) return toast.error("name must not be at least 5 characters")
    // if (yearInTech === "" || yearInTech.length < 6 ) return toast.error("yearInTech must not be at least 5 characters")
    if (phone === "") return toast.error("Phone number must not be at least 5 12 digits")
    if (!isEmail(email)) return toast.error('Pls enter a valid Email')
    if (password === "" || password.length < 8) return toast.error("Password must contain at lease 8 characters ")
    if (password != passwordConfirm) return toast.error("Password must contain match ")

    // const pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/);
    // if(!pattern.test(password)) toast.error("Pass must contain a digit, lowercase/uppercase and special character ")


    register(
      name,
      yearInTech,
      phone,
      email,
      role,
      password,
      passwordConfirm,
      userField,
      userExperienceLevel
    ).then(
      response => {
        console.log(response.data.message)
        setMessage(response.data.message)
        history.push("/authentication/sign-up")
        toast.success(response.data.message)
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setError(true)
        setErrorMsg(resMessage)
        toast.error(resMessage)

      }
    );



    // register(email, password).then(
    //   () => {
    //     toast.info("Registration Succesfull")
    //     history.push("/authentication/sign-in");
    //     window.location.reload();
    //   },
    //   error => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     console.log(resMessage)

    //     setLoading(false)
    //     setError(true)
    //     setErrorMsg(resMessage)
    //   }
    // );
  }
  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <Socials />
        </SuiBox>
        <Separator />
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="text" placeholder="Field" value={userField} onChange={(e) => setUserField(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="text" placeholder="Years in tech" value={yearInTech} onChange={(e) => setYearInTech(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="text" placeholder="User Experience Level" value={userExperienceLevel} onChange={(e) => setUserExperienceLevel(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiButton buttonColor="secondary" onClick={handleOpenMenu} style={{ width: "100%" }}>
                dropdown button
                <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
              </SuiButton>
              <Menu
                anchorEl={openMenu}
                getContentAnchorEl={null}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={(e) => handleCloseMenu}>Pause</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Stop</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Schedule</MenuItem>
              </Menu>
            </SuiBox>

            {/* <Box sx={{ minWidth: 220 }} mb={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={2}
                label="Age"
                onChange={(e) => setUserExperienceLevel(e.target.value)}

              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            </Box> */}

            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" buttonColor="dark" fullWidth onClick={handleSubmitForm}>
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" textColor="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  textColor="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
