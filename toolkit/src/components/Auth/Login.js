import React,{useState,useEffect} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {toast} from "react-toastify";

import {Box, Avatar,Typography,TextField, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {login} from "../../redux/features/authSlice";


const Login = () => {
    const location=useLocation();
    let path='/';
    if(location.state){
        path=location.state.path;
    }
    const dispatch=useDispatch();
    const {isAuthenticated}=useSelector(state=>state.auth.userDetails);
    const navigate=useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.set("email",loginEmail);
        formData.set("password",loginPassword);
        dispatch(login({formData,toast}));
    }
    useEffect(() => {
        if(isAuthenticated){
            navigate(path);
        }
    }, [dispatch,isAuthenticated,navigate,path]);
    
  return (
    <>
        <Box sx={{marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField margin="normal" required  fullWidth id="email" label="Email" type="email" name="email" autoComplete="email" autoFocus value={loginEmail} onChange={(e=>setLoginEmail(e.target.value))}/>
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
                autoComplete="current-password" value={loginPassword} onChange={(e=>setLoginPassword(e.target.value))}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2}} >Sign In</Button>
                <Grid container style={{alignItems:'center',marginBottom:20, textAlign:'center'}}>
                <Grid item xs><Link to="/password/forgot" variant="body2">Forgot password?</Link></Grid>
                </Grid>
            </Box>
        </Box>
    </>
  )
}

export default Login
