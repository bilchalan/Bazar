import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {Box,Grid,Typography,TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {resetPassword} from "../../redux/features/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useParams();

  const { success, loading } = useSelector((state) => state.auth.forgotPassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", newPassword);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword({token, formData, toast}));
  };

  useEffect(() => {    
    if (success) {      
      navigate("/auth");
    }
  }, [dispatch, navigate, success]);

  return (
    <>
    <Box sx={{m:'20px auto',display: 'flex',flexDirection: 'column',alignItems: 'center',maxWidth:350}}>
        <Box sx={{ m: 1, bgcolor: 'primary.main',justifyContent:'center',color:'#fff',borderRadius:5,p:'5px 15px'}}>
        <StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/>
        </Box>
        <Typography component="h1" variant="h5">Reset Password</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal"
                        type="password" 
                        required  
                        fullWidth 
                        id="newPassword" 
                        label="New Password" 
                        name="newPassword" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} />
            <TextField margin="normal"
                        type="password" 
                        required  
                        fullWidth 
                        id="confirmPassword" 
                        label="Confirm Password" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} />    

            <Grid container style={{margin:'10px 0'}}>
                <Grid item xs>                    
                </Grid>
                <Grid item xs>
                <Button type="submit" 
                        disabled={loading?true:false}
                        fullWidth 
                        variant="contained">Change Password
                </Button>
                </Grid>   
            </Grid>

        </Box>
    </Box> 
    </>
  );
};

export default ResetPassword;
