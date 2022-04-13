import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import './Dashboard.css';
import { Typography, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from '../../../redux/features/productsSlice';
import { getAllOrders } from '../../../redux/features/orderSlice';
import { getAllUsers } from '../../../redux/features/authSlice';





const Dashboard = () => {
  const ref = useRef(null);
  const [curWidth,setCurWidth]=useState("");


  useLayoutEffect(() => {
    setCurWidth(ref.current.offsetWidth);
    const handleSize = () => {
      console.log(ref.current.offsetWidth);
      setCurWidth(ref.current.offsetWidth);
    }
    window.addEventListener('resize',handleSize);
    return ()=> window.removeEventListener('resize', handleSize);
  }, []);

  const dispatch = useDispatch();

  const {products}=useSelector((state)=>state.products.allProducts);

  const {orders}=useSelector((state)=>state.orders.allOrders);

  const {users}=useSelector(state=>state.auth.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts({toast}));
    dispatch(getAllOrders({toast}));
    dispatch(getAllUsers({toast}));
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ]
  };

  return (
    <>
    <Box className="rect-box">
      <Typography variant="button" display="block" gutterBottom>Total Amount</Typography>
      <Typography variant="button" display="block" gutterBottom>{totalAmount}</Typography>
    </Box>

    <Box className="circle-box">
        <Box className='product circle' ref={ref} style={{height:curWidth}}>
          <Typography variant="button" display="block">Product</Typography>
          <Typography variant="button" display="block">{products && products.length}</Typography>
        </Box>

        <Box className='order circle' style={{height:curWidth}}>
          <Typography variant="button" display="block">Orders</Typography>
          <Typography variant="button" display="block">{orders && orders.length}</Typography>
        </Box>

        <Box className='user circle' style={{height:curWidth}}>
          <Typography variant="button" display="block">Users</Typography>
          <Typography variant="button" display="block">{users && users.length}</Typography>
        </Box>
    </Box>

    <Box className="chart-box">
      <Box><Line data={lineState} /></Box>
      <Box><Doughnut data={doughnutState} /></Box>
    </Box>
    </>
  );
};

export default Dashboard;
