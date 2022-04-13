import React from 'react';
import {Link} from 'react-router-dom';

import {Box, Avatar,Typography} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
const OrderSuccess = () => {

  return (
    <>
    <Box sx={{m:'20px auto 10px', maxWidth:'450px', textAlign:'center'}}>
        <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'4rem',m:'0 auto' }}>
            <DoneAllIcon fontSize='2.5rem' />            
        </Avatar>
        <Typography component="h1" variant="h5" className='greenColor'>Your Order has been Placed successfully</Typography>
        <Link to="/orders" style={{marginRight:'50px'}}>View Orders</Link>
        <Link to='/'>Back to Home</Link>
    </Box>
    </>
  )
}

export default OrderSuccess