import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {Box,Grid,Typography,TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {updatePassword,loadUser} from '../../redux/features/authSlice';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isUpdated, loading } = useSelector((state) => state.auth.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);
    if(newPassword!==confirmPassword){
      toast.warn("New password and confirm password mismatched!!!");
      return;
    }
    dispatch(updatePassword({formData,toast}));
  };

  useEffect(() => {    
    if (isUpdated) {            
      dispatch(loadUser());
      navigate("/profile");
    } 
  }, [dispatch, navigate, isUpdated]);

  return (
        <>
          <Box sx={{m:'20px auto',display: 'flex',flexDirection: 'column',alignItems: 'center',maxWidth:350}}>
            <Box sx={{ m: 1, bgcolor: 'primary.main',justifyContent:'center',color:'#fff',borderRadius:5,p:'5px 15px'}}>
            <StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/>
            </Box>
            <Typography component="h1" variant="h5">Change Password</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField margin="normal"
                            type="password" 
                            required  
                            fullWidth 
                            id="oldPassword" 
                            label="Old Password" 
                            name="oldPassword" 
                            value={oldPassword} 
                            autoFocus 
                            onChange={(e) => setOldPassword(e.target.value)} />
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
                    <Link to='/password/forgot'>Forgot password?</Link>
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

export default UpdatePassword;
