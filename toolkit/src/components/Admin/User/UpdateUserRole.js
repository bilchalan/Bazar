 import React,{useEffect, useState} from 'react';
 import { useDispatch ,useSelector} from 'react-redux';
 import { useParams } from 'react-router';
 import { toast } from 'react-toastify';
 
 import {Box, Avatar,Typography, Grid, Button } from '@mui/material';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 import MenuItem from '@mui/material/MenuItem';
 import InputLabel from '@mui/material/InputLabel';
 import Select from '@mui/material/Select';
 import FormControl from '@mui/material/FormControl';
 import UpdateIcon from '@mui/icons-material/Update';

 import { getUserDetails, resetUpdateProfile, updateUserRole } from '../../../redux/features/authSlice';

const UpdateUserRole = () => {
  const {id}=useParams();
  const [role,setRole]=useState();
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.auth.singleUser);
  const {loading, isUpdated}=useSelector(state=>state.auth.profile);

  const submitHandler=(e)=>{
    e.preventDefault();

    const formData=new FormData();
    formData.set("role",role);
    dispatch(updateUserRole({id,formData,toast}));
  }
  useEffect(() => {
    dispatch(getUserDetails({id,toast}));
    if(isUpdated){
      toast.success("User role changed successfully.");
      dispatch(resetUpdateProfile());
    }
  }, [dispatch,id,isUpdated]);

  useEffect(() => {
    if(user){
      setRole(user.role);
    }
  }, [user]);
  
  return (
    <Box sx={{m:'0 auto', mt: 2,display: 'flex',flexDirection: 'column',alignItems: 'center', maxWidth:'500px', padding: 2 }}>

      <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'5.35rem' }}>
        {!user.avatar ? <AccountCircleIcon fontSize='2.5rem' /> :
        <img src={user.avatar.url} alt={user.name} style={{width:80, height:80}}/>
        }              
      </Avatar>
      <Typography component="h1" variant="h5">User Account</Typography>

      <Grid container sx={{alignItems:'center',mt:1}}>
        <Grid item xs={6}><Typography variant="button" component="div">User's Name :</Typography></Grid>
        <Grid item xs={6}><Typography variant="button" component="div">{user.name}</Typography></Grid>


        <Grid item xs={6}><Typography variant="button" component="div">E - mail :</Typography></Grid>
        <Grid item xs={6}><Typography variant="button" component="div">{user.email}</Typography></Grid>


        <Grid item xs={6}><Typography variant="button" component="div">Joined Date :</Typography></Grid>
        <Grid item xs={6}><Typography variant="button" component="div">{String(user.createdAt).substr(0, 10)}</Typography></Grid>


        <Grid item xs={6}><Typography variant="button" component="div">User Role :</Typography></Grid>
        <Grid item xs={6}><Typography variant="button" component="div">{user.role}</Typography></Grid>
      </Grid>

      <Grid container sx={{alignItems:'center',mt:3}}>
        <Grid item xs={6}><Typography variant="button" component="div">Change User Role :</Typography></Grid>
        <Grid item xs={6}>
          <FormControl sx={{width:'100%'}}>
            <InputLabel id="role">Role</InputLabel>
            <Select required
                    labelId="role"
                    id="role"
                    value={role || ""}
                    label="Role"
                    onChange={(e)=>setRole(e.target.value)}>
                    
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
            </Select>                    
          </FormControl>
        </Grid>
      </Grid>

      <Grid container sx={{alignItems:'center',mt:1}}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Button variant="contained" startIcon={<UpdateIcon />} onClick={submitHandler} disabled={loading?true:false}>Change</Button>
        </Grid>
      </Grid>
  </Box>
  )
}

export default UpdateUserRole