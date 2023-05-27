import { Search } from "@mui/icons-material";
import { AppBar, Stack, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Cookies from "js-cookie";
import CustomButton from "./CustomButton";
import Axios from "./AxiosFront";
 
const Navbar = ({ handleOpen = () => {}, user, setUser = () => {} }) => {
  useEffect(() => {
    // TODO: Implement get user
    const userToken = Cookies.get('UserToken');
    // console.log(userToken);
    if (userToken == null || userToken == "undefined") return;
    // 1. check if cookie is set
    // 2. send a request to server
    Axios.get("/me", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((res) => {
      console.log(res.data);
      // 3. if success, set user information
      setUser({
        username: res.data.user.username,
        email: res.data.user.email,
      });
    });
  }, []);
  console.log(user);
  const logout = () => {
    setUser();
    Cookies.remove("UserToken");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={2}
      sx={{
        position: "sticky",
        zIndex: 10,
        // marginBottom: "8px",
        padding: "16px 5%",
        backgroundColor: "#023047",
        borderBottom: 1, borderColor: "#FB8500"
      }}

    >
      <Box sx={{ flexGrow: 1 }}>
        <img src="./assets/logo2.svg" />
      </Box>
      
      {user ? (
        <Box sx={{ display: 'flex'}}>
          <Typography sx={{color:'#ffffff', padding: '6px 25px',fontSize:'18px'}}>{user.username}</Typography>
          <Box sx={{
          backgroundColor: '#ffffff',
          color:'#000000',
          padding: '6px 18px',
          borderRadius: 12,
          border: '1px solid #ffffff',
          cursor: 'pointer',
          "&:hover": {
              //you want this to be the same as the backgroundColor above
              backgroundColor: "#ffffff",
            },
        }}>
          <CustomButton text="Log out"  handle={logout} />
          </Box>
        </Box>
      ) : (
        <Box sx={{
          backgroundColor: '#ffffff',
          color:'#000000',
          padding: '6px 18px',
          borderRadius: 12,
          border: '1px solid #ffffff',
          cursor: 'pointer',
          "&:hover": {
              //you want this to be the same as the backgroundColor above
              backgroundColor: "#ffffff",
            },
        }}>
          <CustomButton text="Log in" handle={handleOpen} />
        </Box>
        
      )}
    </Stack>
  );
};
export default Navbar;
