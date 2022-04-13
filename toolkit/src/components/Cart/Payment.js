import React,{useState,useEffect} from 'react';
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, useStripe} from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";



const Payment = (props) => {

  const appearance = {
    theme: 'stripe',
  
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };
  
    //get and set stripe publishable key
    const [stripeApiKey,setStripeApiKey]=useState("");
    async function getStripeApiKey(){
        const {data}=await axios.get(`/api/v1/stripeapikey`);
        setStripeApiKey(data);
    }
    useEffect(() => {
        getStripeApiKey();
      }, [])
      
  return (
    <>    
    {stripeApiKey &&
    <Elements stripe={loadStripe("pk_test_51KQYuhSAYZGZlyhJLiX6Ja4YYMEfaKDmAcM9w68Rwa07weYzwNwXiCDhujdzmaAiddEe3hT9Xvu2tkuPvfbni95700k1vMQ0Fl")}>
        <StripeCheckoutForm {...props}/>
    </Elements>
    }
    </>
  );
};

export default Payment;