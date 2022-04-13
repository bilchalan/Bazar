import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';

import {getOrderDetails,updateOrder} from '../../../redux/features/orderSlice';
import '../../Order/OrderDetails.css';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';


import {Box,Typography, Button, Grid} from '@mui/material';
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import UpdateIcon from '@mui/icons-material/Update';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';

const ProcessOrder = () => {
    const {id}=useParams();
    const [status, setStatus]=useState("");
    const dispatch=useDispatch();
    const {order,loading}=useSelector((state)=>state.orders.orderDetails);
    const {loading:updating,isUpdated}=useSelector((state)=>state.orders.order);

    const submitHandler=(e)=>{
      e.preventDefault();
      if(status===""){
        toast.error("Please select an process option");
        return false;
      }
      const formData=new FormData();
      formData.set("status",status);
      dispatch(updateOrder({id,formData,toast}));
    }

    useEffect(() => {
      dispatch(getOrderDetails({id,toast}));
      if(isUpdated){
        toast.success("Updated Successfully.");        
      }
    }, [dispatch,isUpdated,id])
    
  return (
    <>
    {loading? <BoxShadowLoader/> : (
        <>
        <Typography component="h1" variant="h5" gutterBottom sx={{textAlign:'center'}}>Order Details</Typography>
        <Divider sx={{width:'100%'}} />

        <Box className="order-details-base">  
          <Box className="order-details-child">
            <Box className="title">
              <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><LocalShippingIcon/></Avatar>
              <Typography variant="h6" component="div" gutterBottom>Shippig Address</Typography>
            </Box>               
            <Box>
              <List sx={{width: '100%',bgcolor: 'background.paper'}}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {order.user && order.user.avatar.url?
                      <img style={{width:'100%',height:'100%'}} src={order.user.avatar.url} alt={order.user.name} />
                      : <PersonIcon/>
                      }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={order.user && order.user.name} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar><PhoneIcon /></Avatar></ListItemAvatar>
                  <ListItemText primary={order.shippingInfo && order.shippingInfo.phoneNo} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar><EmailIcon /></Avatar></ListItemAvatar>
                  <ListItemText primary={order.user && order.user.email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar><LocationOnIcon /></Avatar></ListItemAvatar>
                  <ListItemText primary={order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.country}`} />
                </ListItem>
              </List>
            </Box>
          </Box>
            
          <Box className="order-details-child">
            <Box className="title">
              <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><ShoppingCartIcon/></Avatar>
              <Typography variant="h6" component="div" gutterBottom>Cart Items Info</Typography>
            </Box>
            <Box sx={{width:'100%',textAlign:'left',mt:3}}>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <Box key={item.image} sx={{display:'flex',width:'100%',mb:2}}>
                      <Box sx={{mr:'5px'}}>
                        <img src={item.image} alt={item.name} style={{maxWidth:150}} /> 
                      </Box>
                      <Box>
                        <Typography variant="body2" gutterBottom>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Typography>
                        <Typography variant="body2" gutterBottom>{item.price}X{item.quantity} = {item.price*item.quantity}</Typography>
                      </Box>
                  </Box>
                ))}
              </Box>
          </Box>

          <Box className="order-details-child">
              <Box className="title" sx={{mb:2}}>
                <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><FactCheckIcon/></Avatar>
                <Typography variant="h6" component="div" gutterBottom>Orders Info</Typography>
              </Box>   

              <Grid container className='order-grid'>
                <Grid item xs={6}>
                  <Typography variant="button" display="block" gutterBottom>SubTotal : </Typography>
                </Grid>
                  <Grid item xs={6} sx={{textAlign:'right'}}>
                  <Typography variant="button" display="block" gutterBottom>{order && order.itemsPrice}</Typography>
                </Grid>
                <Grid item xs={12} sx={{borderBottom:'1px solid #dadada'}}></Grid>
                <Grid item xs={6}>
                  <Typography variant="button" display="block" gutterBottom>Shipping Charges : </Typography>
                </Grid>
                  <Grid item xs={6} sx={{textAlign:'right'}}>
                  <Typography variant="button" display="block" gutterBottom>{order && order.shippingPrice}</Typography>
                </Grid>
                <Grid item xs={12} sx={{borderBottom:'1px solid #dadada'}}></Grid>
                  <Grid item xs={6}>
                  <Typography variant="button" display="block" gutterBottom>Tax : </Typography>
                </Grid>
                <Grid item xs={6} sx={{textAlign:'right'}}>
                  <Typography variant="button" display="block" gutterBottom>{order && order.taxPrice}</Typography>
                </Grid>
                <Grid item xs={12} sx={{borderBottom:'1px solid #dadada',mb:1}}></Grid>
                <Grid item xs={6} sx={{display:'flex',justifyContent:'right', alignItems:'center'}}>
                  <FunctionsRoundedIcon sx={{borderRadius:'50%',background:'#bdbdbd',color:'#fff',mr:1,width:40,height:40}}/>
                  <Typography variant="button" display="block" gutterBottom>Total : </Typography>
                </Grid>
                <Grid item xs={6} sx={{textAlign:'right'}}>
                  <Typography variant="button" display="block" gutterBottom>{order && order.totalPrice}</Typography>
                </Grid>
              </Grid>
          </Box>

          <Box className="order-details-child">
              <Box className="title" sx={{mb:2}}>
                <Avatar sx={{mr:1,background:'#fff',color:'#9c27b0'}}><MonitorHeartIcon/></Avatar>
                <Typography variant="h6" component="div" gutterBottom> Order Status</Typography>
              </Box>
              <Box sx={{display:'flex', alignItems:'center',mb:2}}>
                <AttachMoneyIcon sx={{borderRadius:'50%',background:'#bdbdbd',color:'#fff',mr:1,width:40,height:40}}/>
                <Typography variant="button" display="block" gutterBottom>
                  {order.paymentInfo && order.paymentInfo.status==="succeeded" ? "Paid" : "Not Paid"}
                </Typography>
              </Box>
              <Box sx={{display:'flex', alignItems:'center',mb:2}}>
                <TakeoutDiningIcon sx={{borderRadius:'50%',background:'#bdbdbd',color:'#fff',mr:1,width:40,height:40}}/>
                <Typography variant="button" display="block" gutterBottom>
                  {order && order.orderStatus}
                </Typography>
              </Box>
              
          </Box>

        </Box>
        <hr/>
        {order && order.orderStatus==="Delivered"?
          <Box sx={{ maxWidth: 500,m:'10px auto',textAlign:'center'}}>
            <DeliveryDiningRoundedIcon 
                        sx={{borderRadius:'50%',background:'#9c27b0',color:'#fff',width:80,height:80}}/>     
            <Typography variant="button" display="block" gutterBottom>This product delivered.</Typography>
          </Box>          
        :
          <Box sx={{ maxWidth: 350,m:'10px auto',textAlign:'left',display:'flex' }}>
              <FormControl sx={{width:'50%',mr:1}}>
                  <InputLabel id="status">Select Process</InputLabel>
                  <Select
                      labelId="status"
                      id="status"
                      value={status}
                      label="Products List"
                      onChange={((e)=>setStatus(e.target.value.toString()))}>
                      
                      {order && order.orderStatus==="Processing"?
                      <MenuItem value='Shipped'>Shipped</MenuItem>
                      :
                      <MenuItem value='Delivered'>Delivered</MenuItem>
                      }
                  </Select>
              </FormControl>
              <Button sx={{}} 
                      variant="contained" 
                      component="span" 
                      startIcon={<UpdateIcon />}
                      onClick={submitHandler}
                      disabled={updating?true:false} 
                      >
                      Update
              </Button>
          </Box>
        }
        </>
        ) 
    }
    </>
  )
}

export default ProcessOrder