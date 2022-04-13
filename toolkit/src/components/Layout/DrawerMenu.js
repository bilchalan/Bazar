import {useState} from 'react';
import {NavLink} from "react-router-dom";


import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';



const DrawerMenu = () => {
    const [open, setOpen] = useState(false);

    const StyledBox = styled(Box)(({ theme }) => ({
      backgroundColor: '#1976d2',
    }));

  return (
      <>
      <IconButton onClick={() => setOpen(true)} sx={{color:'#fff'}}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => {}}>
        <StyledBox sx={{width:'35vw',height:'100vh',color:'fff'}}>
          <Box className='mnwrapper' style={{padding:'25px'}}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Products</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </>
  )
}

export default DrawerMenu