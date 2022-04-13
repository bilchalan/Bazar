import React from 'react';
import {Box} from '@mui/material';
import noentryLogo from '../../images/error.svg';

const Error = () => {
  return (
    <Box sx={{textAlign:'center'}}>
        <img src={noentryLogo} alt='unauthized' width={450}/>
    </Box>
  )
}

export default Error