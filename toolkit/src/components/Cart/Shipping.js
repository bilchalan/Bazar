import React, {useState} from 'react';
import "./Shipping.css";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingInfo} from "../../redux/features/cartSlice";
import {useNavigate} from "react-router-dom";
//import {Country,State,state} from "country-state-city";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import {Box,Typography,TextField, Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Shipping = () => {
    const dispatch=useDispatch();
    const {shipInfo}=useSelector((state)=>state.cart.shippingInfo);

    const [address,setAddress]=useState(shipInfo.address || "");
    const [pinCode,setPincode]=useState(shipInfo.pinCode || "");
    const [phoneNo,setPhoneNo]=useState(shipInfo.phoneNo || "");
    const [city,setCity]=useState(shipInfo.city || "");
    const [state,setState]=useState(shipInfo.state || "");
    const [country,setCountry]=useState(shipInfo.country || "");



    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(saveShippingInfo({address,phoneNo,pinCode,city,country,state}));
        navigate("/cart/confirm-order");
    }

  return (<>

    <Box sx={{m:'20px auto',display: 'flex',flexDirection: 'column',alignItems: 'center',maxWidth:'550px',p:2}}>    
          <LocationOnIcon  sx={{width:100,height:100,color:'#9c27b0'}}/>
          <Typography component="h1" variant="h5">Shipping Information</Typography>
          <Box component="form"  sx={{ mt: 1 }} onSubmit={handleSubmit}>

              <TextareaAutosize required aria-label="address" minRows={5} placeholder="Address" style={{ width: '98%' }}
                          value={address} onChange={(e=>setAddress(e.target.value))}/>   

              <TextField fullWidth margin="normal" required id="phone" label="Phone" type="text" name="phone" 
                            value={phoneNo} onChange={(e=>setPhoneNo(e.target.value))}/>                              

              <Box style={{display:'flex', justifyContent:'space-between',width:'100%'}}>
                <TextField style={{width:'49%'}} margin="normal" required id="city" label="City" type="text" name="city" 
                            value={city} onChange={(e=>setCity(e.target.value))}/>  

                <TextField margin="normal" style={{width:'49%'}} required id="pin" label="Pincode" type="text" name="pin" 
                            value={pinCode} onChange={(e=>setPincode(e.target.value))}/>
              
              </Box>

              <Box style={{display:'flex', justifyContent:'space-between',width:'100%'}}>
                    <CountryDropdown style={{width:'49%'}}
                      classes="ship-drop-down"
                      defaultOptionLabel="Select a country"
                      value={country}
                      valueType='short'
                      priorityOptions={["CA", "US", "GB"]} 
                      onChange={(e)=>setCountry(e)}/>                   

                    <RegionDropdown style={{width:'49%'}}
                      classes="ship-drop-down"
                      blankOptionLabel="No country selected."
                      defaultOptionLabel="Now select a region"
                      countryValueType="short"
                      country={country}
                      value={state}
                      onChange={(e)=>setState(e)}/>                    
              </Box>
              











              <Box sx={{marginTop: 2,display: 'flex',justifyContent: 'center',}}>
                <Button type="submit" sx={{display:'flex',alignItems:'normal'}} variant="contained" 
                        startIcon={<LocalShippingIcon />}>Continue</Button>
              </Box>

          </Box>

        </Box> 

  </>);
};

export default Shipping;
