import { Box, Button, Link, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AxiosError } from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Axios from "./AxiosFront";
import Checkbox from "@mui/material/Checkbox";
import {IconButton} from "@mui/material";
import React, { useState } from "react";
// import {AxiosError} from 'axios';
const Login = ({
    handleOpen={handleOpen},
    open=false,
    setOpen=()=>{},
    setStatus = () => {},
    setUser = () => {},
}) => {
    const [isLogin, setIsLogin] = useState(true);
    const handleClose = () => {
        setSignUpOpen(false);
        setOpen(false)};
  const signButton = {
    backgroundColor: "#023047",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#023047",
    },
    width: { md: "60%", xs: "80%" },
    textTransform: "none",
    padding: "10px 0",
    fontFamily: "arial",
    fontSize: { xs: "14px", md: "16px" },
    alignItems: "center",
    marginLeft: { md: "20%", xs: "10%" },
  };
  const signField = {
    width: { md: "60%", xs: "80%" },
    fontFamily: "arial",
    marginLeft: { md: "20%", xs: "10%" },
  };
  const headerTextStyle = {
    fontFamily: "Roboto",
    fontSize: { xs: "20px", md: "30px" },
  };
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateForm = () => {
    let isValid = true;
    if (!usernameOrEmail) {
      setUsernameOrEmailError("Username or email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    return isValid;
  };
  const handleEmailChange = (event) => {
    setUsernameOrEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    //Axios needed
    try{
      const response = await Axios.post('/login',{
        usernameOrEmail,
        password,
      });
      if (response.data.success) {
        setUsernameOrEmail('');
        setPassword(' ');
        setUser({
          username:response.data.username,
          email:response.data.email,
      });
        setStatus({
          msg:response.data.msg,
          severity:'success'
        });
        handleClose();
      }
    }
    catch(e){
      setUsernameOrEmail('');
      setPassword('');
      if (e instanceof AxiosError) {
        // check if e.response exist
        if(e.response)
        return setStatus({
          msg:e.response.data.error,
          severity:'error',
        });
      }
      return setStatus({
        msg:e.message,
        severity:'error',
      });
    }
  };

  //SignUp Form
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password1, setPassword1] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  
  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
    setHasError(false);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleSignUpEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignUpPasswordChange = (event) => {
    setPassword1(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setRePassword(event.target.value);
  };
  const validateFormSignUp=()=>{ 
    let isValid=true;
    // check user 
    if(!username) {
      setUsernameError('Username is required');
      isValid=false;
    }
    // check email
    if(!email) {
      setEmailError('Email is required');
      isValid=false;
    }
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      setEmailError('Invalid email format');
      isValid=false;
    }
    // check password
    if(!password1) {
      setPasswordError1('Password is required');
      isValid=false;
    }
    if(!rePassword) {
      setRePasswordError('Confirm password is required');
    }
    if(password1!==rePassword) {
      setPasswordError1('Password is not match');
      setRePassword('');
      setPassword1('');
      isValid=false;
    }
    return isValid;
  };
  const handleSubmitSignUp= async()=>{
    if (!isChecked) {
        setHasError(true);
      }
    if(!validateFormSignUp()) return;
    try{
      const response = await Axios.post('/register',{
        username,
        email,
        password1,
      });
      if (response.data.success){
        setIsLogin(true);
        setUsername('');
        setEmail('');
        setPassword1('');
        setRePassword('');
        handleOpen();
        setIsChecked(false);
        setStatus({
          msg: response.data.msg,
          severity: 'success'
        });
        
      }
    }
    catch(e){
      setPassword1('');
      setRePassword('');
      if(e instanceof AxiosError)
      if(e.response)
        //check if e.response exist
        return setStatus({
          msg: e.response.data.error,
          severity: 'error',
        })
        return setStatus({
          msg : e.messsage,
          severity:'error',
          });
    }
  }
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const handleSignupOpen = () => {
    setOpen(false);
    setSignUpOpen(true);
  };
  const handleSignupClose = () => {
    setSignUpOpen(false);
  };
  return (
    <Box>
    {/* Login Modal */}
    <Modal open={open} onClose={handleClose}>
    <Box sx={{
                position: "absolute",
                bgcolor: "white",
                height: { xs: "100%", md: "90%" },
                width: { xs: "100%", md: "60%" },
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                justifyContent: "center",
                direction: "column",
            }}>
                <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
      <Typography sx={headerTextStyle} style={{ textAlign: "center" }}>
        Welcome Back.
      </Typography>
      <form>
        <TextField
          sx={signField}
          style={{ backgroundColor: "#F0F0F0" }}
          label="Username or"
          value={usernameOrEmail}
          fullWidth
          error={usernameOrEmailError !== ""}
          helperText={usernameOrEmailError}
          onChange={handleEmailChange}
          margin="normal"
          // variant="outlined"
        />
        <TextField
          sx={signField}
          label="Password"
          type="password"
          style={{ backgroundColor: "#F0F0F0" }}
          value={password}
          fullWidth
          error={passwordError !== ""}
          helperText={passwordError}
          onChange={handlePasswordChange}
          margin="normal"
          // variant="outlined"
        />
        <br></br>
        <br />
<Box sx={signField}>
          <Link
            color="#999999"
            sx={{ alignSelf: "end", cursor: "pointer" }}
            onClick={() => {
                  handleSignupOpen();setIsLogin(false);
                }}
          >
            Don't you have an account? Register Now.
          </Link>
        </Box>
        <br />
        <br />
        <Button  onClick={handleSubmit} sx={signButton}>
          Login
        </Button>
        <br />
        <br />
        
      </form>
    </Box>
    </Modal>
    {/* SignUp Modal */}

    <Box sx={signField}>
        <Modal open={signUpOpen} onClose={handleSignupClose}>
            <Box  sx={{
        position: "absolute",
        bgcolor: "white",
        height: { xs: "100%", md: "90%" },
        width: { xs: "100%", md: "60%" },
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignItems: "center",
        justifyContent: "center",
        direction: "column",
    }}>
        <IconButton onClick={handleSignupClose}>
            <CloseIcon />
          </IconButton>
        <Typography sx={headerTextStyle} style={{ textAlign: "center" }}>
              Join Us
            </Typography>
          <form>
        <TextField
        sx={signField}
        style={{ backgroundColor: "#F0F0F0" }}
        value={username}
        onChange={handleUsernameChange}
        fullWidth
        error={usernameError !== ''}
        helperText={usernameError}
        label="Username"
        placeholder="Type your username"
      />
      <TextField
      sx={signField}
      style={{ backgroundColor: "#F0F0F0" }}
        value={email}
        onChange={handleSignUpEmailChange}
        margin="normal"
        fullWidth
        error={emailError !== ''}
        helperText={emailError}
        label="Email"
        placeholder="Type your email"
      />
      <TextField
      sx={signField}
      style={{ backgroundColor: "#F0F0F0" }}
      onChange={handleSignUpPasswordChange}
        value={password1}
        margin="normal"
        fullWidth
        error={passwordError1 !== ''}
        helperText={passwordError1}
        type="password"
        label="Password"
        placeholder="Type your password"
      />
      <TextField
      sx={signField}
      style={{ backgroundColor: "#F0F0F0" }}
        value={rePassword}
        margin="normal"
        onChange={handleConfirmPasswordChange}
        fullWidth
        error={rePasswordError !== ''}
        helperText={rePasswordError}
        type="password"
        label="Confirm password"
        placeholder="Type your password"
      />
      
      <br></br>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheck}
                    color="primary"
                  />
                }
                label="By creating an account you agree to the terms of use and our privacy and policy"
                sx={signField}
              />
              <Box sx={signField}>
                {hasError && (
                  <div style={{ color: "red" }}>Please check the box</div>
                )}
              </Box>
              <br />
              <Box sx={signField}>
              <Link color="#999999" sx={{ alignSelf: 'end', cursor: 'pointer' }} onClick={() => {
                    handleOpen();setIsLogin(true);
                  }}>
        Already have an account? Log in.
      </Link>
      </Box>
      <br/>
      <br/>
              <Button  onClick={handleSubmitSignUp} sx={signButton}>
                Register
              </Button>
      </form>
    </Box>
        </Modal>
        </Box>
    </Box>
  );
};
export default Login;
