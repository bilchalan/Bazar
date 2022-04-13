import React from 'react';
import {Box} from '@mui/material';
import noentryLogo from '../../images/notfound1.svg';

const NotFound = () => {
  return (
    <Box sx={{textAlign:'center'}}>
        <img src={noentryLogo} alt='unauthized' width={450}/>
    </Box>
  )
}

export default NotFound