import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';

import {Box, Avatar,Typography,TextField, Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoIcon from '@mui/icons-material/Photo';

import {updateProfile,loadUser} from '../../redux/features/authSlice';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth.userDetails);
  const { loading, isUpdated } = useSelector((state) => state.auth.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [checkAvatar,setCheckAvatar]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    formData.set("checkAvatar", checkAvatar);
    
    dispatch(updateProfile({formData,toast}));
  };

  //profile image handler
  const updateUserProfilePicture = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
      setCheckAvatar(user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      navigate("/profile");
    }
  }, [dispatch,user,isUpdated,navigate]);

  return (
    <>
       
    <Box sx={{marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
      <Typography component="h1" variant="h5">Update Profile</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" 
                      required  
                      fullWidth 
                      id="name" 
                      label="Name" 
                      name="name" 
                      value={name || ""} 
                      autoFocus 
                      onChange={(e) => setName(e.target.value)} />
          <TextField margin="normal" 
                      required 
                      fullWidth 
                      id="email" 
                      label="Email" 
                      type="email" 
                      name="email" 
                      value={email || ""} 
                      onChange={(e) => setName(e.target.value)} />

          <Grid container style={{alignItems:'center',margin:'10px 0'}}>
            <Grid item xs>
              <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'5.35rem' }}>
                {!avatar ?
                <AccountCircleIcon fontSize='2.5rem' />
                :
                <img src={avatar} alt={avatar} style={{width:80, height:80}}/>
                }
                
              </Avatar>
            </Grid>
            <Grid item>
            <Button variant="contained" component="label" startIcon={<PhotoIcon/>}> Change Profile Picture
              <input type="file" hidden name="avatar" onChange={updateUserProfilePicture}/>
            </Button>
            </Grid>
          </Grid>
          
          <Button type="submit" 
                  fullWidth 
                  variant="contained" 
                  sx={{ mt: 3, mb: 2}} 
                  disabled={loading?true:false}>Update
          </Button>
      </Box>
    </Box>    
    </>
  );
};

export default UpdateProfile;
