import React,{useState,useEffect} from 'react';
import {useNavigate,useLocation} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {toast} from "react-toastify";

import {Box, Avatar,Typography,TextField, Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import PhotoIcon from '@mui/icons-material/Photo';

import {registration} from '../../redux/features/authSlice';


const Registration = () => {
  const location=useLocation();
  let path='/profile';
  if(location.state){
      path=location.state.path;
  }

  const dispatch=useDispatch();
  const {isAuthenticated}=useSelector(state=>state.auth.userDetails);
  const navigate=useNavigate();

  const [user, setUser]=useState({name:"",email:"",password:""});
  const {name,email,password}=user;

  const [avatar,setAvatar]=useState("");
  const [previewAvatar,setPreviewAvatar]=useState("");

  const registrationFormValue =(e)=>{
        
    if(e.target.name==="avatar"){
        const reader=new FileReader();
          
        reader.onload=()=>{
            if(reader.readyState===2){
                setPreviewAvatar(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        
    }else{
        setUser({...user,[e.target.name]:e.target.value});
    }
  }


  const handleSubmit=(e)=>{
      e.preventDefault();
      if(avatar===""){
        toast.info('Please select a profile image');
      }
      const formData=new FormData();
      formData.set("name",name);
      formData.set("email",email);
      formData.set("password",password);
      formData.set("avatar",avatar);
      dispatch(registration({formData,toast}));
  }
  
  useEffect(() => {
    if(isAuthenticated){
      navigate(path);
    }
  }, [dispatch,isAuthenticated,navigate,path]);

  return (
    <>

    <Box sx={{marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main'}}><NoAccountsIcon/></Avatar>
        <Typography component="h1" variant="h5">Registration</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required  fullWidth id="name" label="Name" name="name" value={name} autoFocus onChange={registrationFormValue}/>
            <TextField margin="normal" required fullWidth id="email" label="Email" type="email" name="email" value={email} onChange={registrationFormValue} autoComplete="email" />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"  value={password} autoComplete="current-password" onChange={registrationFormValue}
            />

            <Grid container style={{alignItems:'center',margin:'10px 0'}}>
              <Grid item xs>
                <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'5.35rem' }}>
                  {!previewAvatar ?
                  <AccountCircleIcon fontSize='2.5rem' />
                  :
                  <img src={previewAvatar} alt={previewAvatar} style={{width:80, height:80}}/>
                  }
                  
                </Avatar>
              </Grid>
              <Grid item>
              <Button variant="contained" component="label" startIcon={<PhotoIcon/>}> Upload Profile Picture
                <input type="file" hidden name="avatar" onChange={registrationFormValue}/>
              </Button>
              </Grid>
            </Grid>
            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2}}>Sign In</Button>
        </Box>
    </Box>

    </>
  )
}

export default Registration
