import React, {useEffect,createRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe, useElements} from "@stripe/react-stripe-js";

import {Box, Avatar,Typography, Button, Grid } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';

import {createOrder} from "../../redux/features/orderSlice";
import {removeAllStorage} from "../../redux/features/cartSlice";

const StripeCheckoutForm=(props)=> {
    const btnPayRef=createRef();

    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate=useNavigate();
    const elements=useElements();
    const stripe=useStripe();
    const {shipInfo}=useSelector((state)=>state.cart.shippingInfo);//new
    const {products} = useSelector((state) => state.cart.cartItems);//new
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth.userDetails);//new
    const {success}=useSelector((state)=>state.orders.newOrder);

    //Payment Data
    const paymentData={
        amount:Math.round(orderInfo.totalPrice*100),
    }

    const order={
        shippingInfo:shipInfo,
        orderItems:products,
        itemsPrice:orderInfo.subTotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }

    const submitHandler=async (e)=>{
        e.preventDefault();
        btnPayRef.current.disabled=true;        
        try {
            const config={headers: {"Content-Type": "application/json"}};
            const {data}=await axios.post(`/api/v1/payment/process`,paymentData,config);

            const client_secret=data.client_secret;
            if(!stripe || !elements) return;

            const result=await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shipInfo.address,
                            city:shipInfo.city,
                            state:shipInfo.region,
                            postal_code:shipInfo.pinCode,
                            country:shipInfo.country
                        }
                    }
                }
            });
            if(result.error){
                toast.error(result.error.message);
                btnPayRef.current.disabled=false;
            }else{
                if(result.paymentIntent.status==="succeeded"){
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status,
                    }
                    dispatch(createOrder({order,toast}));
                }else{
                    toast.error("There is some issues while processing payment!!");
                    btnPayRef.current.disabled=false;
                }
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
            btnPayRef.current.disabled=false;
        }
    }
useEffect(() => {
  if(success){
    btnPayRef.current.disabled=false;
    dispatch(removeAllStorage());
    navigate('/order/success', { replace: true });
  }
}, [dispatch,success,navigate,btnPayRef]);


  return (
    <Box component="form" onSubmit={(e)=>submitHandler(e)} sx={{ m:'20px auto',maxWidth:'350px',textAlign:'center' }}>

        <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'4rem',m:'0 auto' }}>
            <PaymentIcon fontSize='2.5rem' />            
        </Avatar>
        <Typography component="h1" variant="h5">Stripe Payment</Typography>
        <hr/>
        <Box sx={{textAlign:'right'}}>
        <Grid container style={{alignItems:'center',margin:'10px 0'}}>
            <Grid item xs sx={{mr:1}}><Typography variant="button" display="block">Card Number : </Typography></Grid>
            <Grid item xs><CardNumberElement style={{border:'1px solid #dadada'}}/></Grid>
        </Grid>   

        <Grid container style={{alignItems:'center',margin:'10px 0'}}>
            <Grid item xs sx={{mr:1}}><Typography variant="button" display="block">Card Expire Date : </Typography></Grid>
            <Grid item xs><CardExpiryElement style={{border:'1px solid #dadada'}}/></Grid>
        </Grid>    

        <Grid container style={{alignItems:'center',margin:'10px 0'}}>
            <Grid item xs sx={{mr:1}}><Typography variant="button" display="block">Card CVC : </Typography></Grid>
            <Grid item xs><CardCvcElement style={{border:'1px solid #dadada'}}/></Grid>
        </Grid>
        </Box>
        <Button sx={{ mt: 3, mb: 2}}
                type="submit"                 
                fullWidth 
                variant="contained"
                ref={btnPayRef}>{`Pay - ${orderInfo && orderInfo.totalPrice}`}                
        </Button>

    </Box>
  )
}

export default StripeCheckoutForm