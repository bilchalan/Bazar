import React from "react";
import { useSelector } from "react-redux";
import {useNavigate,Link} from "react-router-dom";
import './ConfirmOrder.css';

import {Box,Typography, Button} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const ConfirmOrder = () => {
  const {shipInfo} = useSelector((state)=>state.cart.shippingInfo);
  const {products} = useSelector((state) => state.cart.cartItems);
  const {user} = useSelector((state) => state.auth.userDetails);

  //const { user } = useSelector((state) => state.user);
  const subTotal=products.reduce((acc,item)=>acc+item.quantity*item.price,0);
  const shippingCharges=subTotal>1000?0:200;
  const tax=subTotal*0.18;
  const totalPrice=subTotal+shippingCharges+tax;
  const address=`${shipInfo.address},${shipInfo.city},${shipInfo.state},${shipInfo.country}`;

  const navigate=useNavigate();
  const proceedToPayment=()=>{
      const data={
          subTotal,
          shippingCharges,
          tax,
          totalPrice
      }
      sessionStorage.setItem("orderInfo",JSON.stringify(data));
      navigate("/process/payment");
  }
  return (
    <>
      <Typography component="h1" variant="h5" gutterBottom sx={{textAlign:'center'}}>Cart and Shipping Information</Typography>
      <Divider sx={{width:'100%'}} />

    <Box className="base-div3">  
      <Box className="div3">
        <Box className="title">
          <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><LocalShippingIcon/></Avatar>
          <Typography variant="h6" component="div" gutterBottom>Shippig Address</Typography>
        </Box>               
        <Box>
          <List sx={{width: '100%',bgcolor: 'background.paper',mb:5}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {user.avatar.url?
                  <img style={{width:'100%',height:'100%'}} src={user.avatar.url} alt={user.name} />
                  : <PersonIcon/>
                  }
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar><Avatar><PhoneIcon /></Avatar></ListItemAvatar>
              <ListItemText primary={shipInfo.phoneNo} />
            </ListItem>
            <ListItem>
              <ListItemAvatar><Avatar><EmailIcon /></Avatar></ListItemAvatar>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar><Avatar><LocationOnIcon /></Avatar></ListItemAvatar>
              <ListItemText primary={address} />
            </ListItem>
          </List>
        </Box>
      </Box>
        
      <Box className="div3 divmid">
        <Box className="title">
          <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><ShoppingCartIcon/></Avatar>
          <Typography variant="h6" component="div" gutterBottom>Cart Items Info</Typography>
        </Box>
        <Box sx={{width:'100%',textAlign:'left',mt:3}}>
          {products &&
            products.map((item) => (
              <Box key={item.image} sx={{display:'flex',width:'100%',mb:2}}>
                  <Box sx={{mr:'5px'}}>
                    <img src={item.image} alt={item.name} style={{maxWidth:100}} /> 
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom><Link to={`/product/${item.product}`}>{item.name}</Link></Typography>
                    <Typography variant="body2" gutterBottom>{item.price}X{item.quantity} = {item.price*item.quantity}</Typography>
                  </Box>
              </Box>
            ))}
          </Box>
      </Box>

      <Box className="div3 last">
          <Box className="title">
            <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><PaidIcon/></Avatar>
            <Typography variant="h6" component="div" gutterBottom>Orders Info</Typography>
          </Box>             
          <Typography variant="button" display="block" gutterBottom>SubTotal : {subTotal}</Typography>
          <Typography variant="button" display="block" gutterBottom>Shipping Charges : {shippingCharges}</Typography>
          <Typography variant="button" display="block" gutterBottom>tax : {tax}</Typography>
          <Typography variant="button" display="block" gutterBottom>Total : {totalPrice}</Typography>
      </Box>
    </Box>
        
        <Button sx={{width:'250px',m:'0 auto',display:'block'}} variant="contained" onClick={proceedToPayment}>Payment and Continue</Button>
    </>
  );
};

export default ConfirmOrder;
