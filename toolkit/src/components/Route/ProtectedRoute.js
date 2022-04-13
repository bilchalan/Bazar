import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

import BoxShadowLoader from "../Skeleton/BoxShadowLoader";


const ProtectedRoute = () => {
  const navigate=useNavigate();
  const { isAuthenticated, error} = useSelector((state) => state.auth.userDetails);
  useEffect(() => {
    if(error){
      toast.error(error);
    }
    if(isAuthenticated===false){
      navigate("/auth");
    }
  }, [isAuthenticated, navigate, error])
  
  return isAuthenticated ? <Outlet /> : 
  <>
  <BoxShadowLoader/>
  </>
  ; 
}
export default ProtectedRoute;
