import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import { logout, removeError } from '../../redux/features/authSlice';

import Avatar from '@mui/material/Avatar';
import SpeedDial from '@mui/material/SpeedDial';
import PhotoIcon from '@mui/icons-material/Photo';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; 
import LogoutIcon from '@mui/icons-material/Logout';

const AuthenticatedMenu = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user, error}=useSelector((state)=>state.auth.userDetails);

    const actions = [
        { icon: <ShoppingBasketIcon />, name: 'Orders', func: orders },
        { icon: <AccountBoxIcon />, name: 'Profile', func: profile },
        { icon: <LogoutIcon />, name: 'Logout', func: logoutUser},
    ];
    if(user.role === "admin") {
      actions.unshift(
        {icon: <DashboardIcon />,name: "Dashboard",func: dashboard,}
        );
    }

    function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function profile() {
        navigate("/profile");
      }
      function logoutUser() {
        dispatch(logout({toast}))
        navigate("/");
      }
      useEffect(()=>{
        if(error){
          toast.error(error);
          dispatch(removeError());
        }
      },[dispatch,error])

  return (
    <SpeedDial
        ariaLabel="authenticated area"
        sx={{ position: 'absolute',top:0,right:0}}
        icon={
              <Avatar>
                {user && user.avatar.url?
                <img className="speedDialIcon" src={user.avatar.url} alt="Profile" width='100%' height='100%'/>
                :
                <PhotoIcon/>
                }
              </Avatar>
            }
        direction="down"
    >
    {actions.map((action) => (
        <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 768 ? true : false}
        />
    ))}

    </SpeedDial>
  )
}

export default AuthenticatedMenu