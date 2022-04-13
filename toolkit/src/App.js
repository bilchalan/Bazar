import React,{useEffect} from "react";
import './App.css';
import {Route, Routes} from "react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import {useSelector} from 'react-redux';
import "@stripe/stripe-js";

import store from "./redux/store";
import MainLayout from "./components/Layout/MainLayout";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Auth from './components/Auth/Auth';
import UserProfile from "./components/Auth/UserProfile";
import UpdateProfile from "./components/Auth/UpdateProfile";
import UpdatePassword from "./components/Auth/UpdatePassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import { loadUser } from "./redux/features/authSlice";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ProtectedAdminRoute from "./components/Route/ProtectedAdminRoute";
import Cart from "./components/Cart/Cart";
import MyOrders from './components/Order/MyOrders';

import DashboardLayout from "./components/Admin/Layout/DashboardLayout";
import CategoryList from "./components/Admin/Category/CategoryList";
import AddNewCategory from "./components/Admin/Category/AddNewCategory";
import UpdateCategory from "./components/Admin/Category/UpdateCategory";
import AddNewProduct from "./components/Admin/Product/AddNewProduct";
import ProductList from "./components/Admin/Product/ProductList";
import ProductReviews from "./components/Admin/Review/ProductReviews";
import UpdateProduct from "./components/Admin/Product/UpdateProduct";
import OrderList from "./components/Admin/Order/OrderList";
import ProcessOrder from "./components/Admin/Order/ProcessOrder";
import UsersList from "./components/Admin/User/UsersList";
import UpdateUserRole from "./components/Admin/User/UpdateUserRole";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Layout/Dashboard";
import Aboutus from "./components/pages/Aboutus";
import Contactus from "./components/pages/Contactus";
import Unauthorized from "./components/Error/Unauthorized";
import NotFound from "./components/Error/NotFound";
import Error from "./components/Error/Error";



function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <div className="app">
      <ToastContainer
          theme='colored'
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
      />
      <Routes>
        <Route path="/" element={<MainLayout/>}>          
          <Route index element={<Products/>}/>
          <Route path="about-us" element={<Aboutus/>}/>
          <Route path="contact-us" element={<Contactus/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="auth" element={<Auth/>}/>
          <Route path="password/forgot" element={<ForgotPassword/>}/>
          <Route path="password/reset/:token" element={<ResetPassword/>}/>
          <Route path="cart" element={<Cart/>}/>         

          <Route path="/" element={<ProtectedRoute/>}>
            <Route path="unauthorized" element={<Unauthorized/>}/>
            <Route path="profile" element={<UserProfile/>}/>
            <Route path="me/update" element={<UpdateProfile/>}/>
            <Route path="password/update" element={<UpdatePassword/>}/>
            <Route path="cart/shipping" element={<Shipping/>}/>
            <Route path="cart/confirm-order" element={<ConfirmOrder/>}/>
            <Route path="process/payment" element={<Payment/>}/> 
            <Route path="order/success" element={<OrderSuccess/>}/>
            <Route path="orders" element={<MyOrders/>}/>
            <Route path="order/:id" element={<OrderDetails/>}/>
          </Route>
          
          <Route path="/admin" element={<ProtectedAdminRoute/>}>
            <Route path="/admin" element={<DashboardLayout/>}>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="categorylist" element={<CategoryList/>}/>
              <Route path="category" element={<AddNewCategory/>}/>
              <Route path="category/:id" element={<UpdateCategory/>}/> 

              <Route path="product" element={<AddNewProduct/>}/>
              <Route path="productlist" element={<ProductList/>}/>
              <Route path="product/:id" element={<UpdateProduct/>}/>

              <Route path="reviews" element={<ProductReviews/>}/>

              <Route path="orders" element={<OrderList/>}/>
              <Route path="order/:id" element={<ProcessOrder/>}/>

              <Route path="users" element={<UsersList/>}/>
              <Route path="user/:id" element={<UpdateUserRole/>}/>

            </Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/not-found" element={<NotFound/>}/>
          <Route path="/error" element={<Error/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
