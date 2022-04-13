import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {Box,Typography,TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import TokenIcon from '@mui/icons-material/Token';
import SendIcon from '@mui/icons-material/Send';

import {forgotPassword} from '../../redux/features/authSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth.forgotPassword);

  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword({formData,toast}));
  };

  return (
    <>
      <Box sx={{m:'20px auto',display: 'flex',flexDirection: 'column',alignItems: 'center',maxWidth:350}}>
        <Box sx={{ m: 1, bgcolor: 'primary.main',justifyContent:'center',color:'#fff',borderRadius:5,p:'5px 15px'}}>
        <StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/>
        </Box>
        <Typography component="h1" variant="h5">Password Recovery</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal"
                        type="email" 
                        required  
                        fullWidth 
                        id="email" 
                        label="Email" 
                        name="email" 
                        value={email} 
                        autoFocus 
                        onChange={(e) => setEmail(e.target.value)} />

            <Button sx={{lineHeight:'normal',mt:2,p:'10px 0'}} 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        disabled={loading?true:false}
                        startIcon={<TokenIcon />} 
                        endIcon={<SendIcon />} >Send Token to Email               
            </Button>

        </Box>
      </Box> 
    </>
  );
};

export default ForgotPassword;
