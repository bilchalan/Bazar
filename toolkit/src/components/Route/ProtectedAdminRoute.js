import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

import BoxShadowLoader from "../Skeleton/BoxShadowLoader";


const ProtectedAdminRoute = () => {
  const navigate=useNavigate();
  const { isAuthenticated ,user} = useSelector((state) => state.auth.userDetails);
  useEffect(() => {
    if(isAuthenticated===false){
      navigate("/auth");
    }
  }, [isAuthenticated, navigate])
  
  return (
    isAuthenticated && user.role==='admin'? <Outlet /> 
    : isAuthenticated && user.role!=='admin'? <Navigate to='/unauthorized'/>
    : <BoxShadowLoader/>
  );
}
export default ProtectedAdminRoute;
