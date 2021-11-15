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

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

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
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleSubmitForm = () => {
    if (email === "") return toast.error("Email must be a vailid email")
    if (firstname === "" || firstname.length < 6) return toast.error("Firstname must not be at least 5 characters")
    if (lastname === "" || lastname.length < 6 ) return toast.error("Lastname must not be at least 5 characters")
    if (phone === "") return toast.error("Phone number must not be at least 5 12 digits")
    if (!isEmail(email)) return toast.error('Pls enter a valid Email')
    if (password === "" || password.length < 8) return toast.error("Password must contain at lease 8 characters ")

    // const pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/);
    // if(!pattern.test(password)) toast.error("Pass must contain a digit, lowercase/uppercase and special character ")


    register(
      firstname,
      lastname,
      phone,
      email,
      role,
      password,
      passwordConfirm
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
        // this.setState({
        //   successful: false,
        //   message: resMessage
        // });
      }
    );

    register(email, password).then(
      () => {
        toast.info("Registration Succesfull")
        history.push("/authentication/sign-in");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(resMessage)

        setLoading(false)
        setError(true)
        setErrorMsg(resMessage)
      }
    );
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
              <SuiInput placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            </SuiBox>
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
