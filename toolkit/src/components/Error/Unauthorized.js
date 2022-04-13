import React from 'react';
import {Box,Typography} from '@mui/material';
import noentryLogo from '../../images/restricted.svg';

const Unauthorized = () => {
  return (
    <Box sx={{textAlign:'center'}}>
        <img src={noentryLogo} alt='unauthized'/>
        <Typography variant="h3" component="div" className='redColor'>Unauthorized</Typography>
    </Box>
  )
}

export default Unauthorized