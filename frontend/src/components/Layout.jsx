import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Fab} from '@mui/material';
import GlobalContext from './GlobalContext';
import Navbar from './Navbar'
import Error from './Error';
import React, { useEffect } from 'react';
import Login from './Login';
 
const Layout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [status, setStatus] = useState("");
  const handleOpen = () => setOpenLoginModal(true);
  
  const [user, setUser] = useState();
  const globalContextValue = useMemo(() => {
    return {
      user,
      setUser,
      setStatus,
    };
  }, [user]);
  const generatekey = () => {
    return Math.random();
  };
  return(
    <GlobalContext.Provider value={globalContextValue}>
        <Box sx={{
          minHeight: '100vh',
          background:'#ffffff'
        }}> 
        {/* <Container maxWidth="xl"> */}
          <Navbar handleOpen={handleOpen} user={user} setUser={setUser}/>
          <Outlet />
        {/* </Container> */}
        <Login handleOpen={handleOpen} open={openLoginModal} setOpen={setOpenLoginModal} setStatus={setStatus} setUser={setUser} />
        {status ? (
          <Error key={generatekey()} open={status.open} severity={status.severity} message={status.msg} />
        ) : null}
        </Box>
    </GlobalContext.Provider>
  )
};

export default Layout;
