import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

import {Avatar,Typography, Grid,Card } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const UserProfile = () => {

  const {user}=useSelector(state=>state.auth.userDetails);

  return (


    <Card sx={{margin:'0 auto', marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center', maxWidth:'500px', padding: 2 }}>

      <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'5.35rem' }}>
        {!user ? <AccountCircleIcon fontSize='2.5rem' /> :
        <img src={user.avatar.url} alt={user.name} style={{width:80, height:80}}/>
        }              
      </Avatar>

      <Typography component="h1" variant="h5">Account Details</Typography>

      <Grid container style={{alignItems:'center'}}>
        <Grid item xs><Typography variant="button" component="div">User's Name :</Typography></Grid>
        <Grid item><Typography variant="button" component="div">{user.name}</Typography></Grid>
      </Grid>
      <Grid container style={{alignItems:'center'}}>
        <Grid item xs><Typography variant="button" component="div">E - mail :</Typography></Grid>
        <Grid item><Typography variant="button" component="div">{user.email}</Typography></Grid>
      </Grid>
      <Grid container style={{alignItems:'center'}}>
        <Grid item xs><Typography variant="button" component="div">Joined Date :</Typography></Grid>
        <Grid item><Typography variant="button" component="div">{String(user.createdAt).substr(0, 10)}</Typography></Grid>
      </Grid>  
      <Grid container style={{alignItems:'center',margin:'10px 0', textAlign:'center'}}>
        <Grid item xs sx={{textAlign:'left'}}><Link to='/me/update'>Update profile</Link></Grid>
        <Grid item xs sx={{textAlign:'right'}}><Link to='/password/update'>Change password</Link></Grid>         
      </Grid>

    </Card>


  )
}

export default UserProfile