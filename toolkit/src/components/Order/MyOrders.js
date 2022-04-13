import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import LaunchIcon from '@mui/icons-material/Launch';

import { getMyOrders } from '../../redux/features/orderSlice';
import BoxShadowLoader from '../../components/Skeleton/BoxShadowLoader';


const MyOrders = () => {
  const dispatch=useDispatch();
  const {loading,orders}=useSelector(state=>state.orders.myOrders);

  //for grid rows and column-----------------------
  const columns=[
    {field:"id",headerName:"Order ID",headerClassName:'gridHeader',hideable: true,minWidth:90,flex: 1},
    {field:"status",headerName:"Status",headerClassName:'gridHeader',minWidth:100,flex: 1},
    {field:"itemsQty",headerName:"Item Quantity",headerClassName:'gridHeader',minWidth:100,type:'number',flex: 1},
    {field:"amount",headerName:"Amount",headerClassName:'gridHeader',minWidth:80,flex:1,type:'number',},  
    {field:"details", headerName:"Details Link",headerClassName:'gridHeader',minWidth:90,flex: .5,type:'number',sortable:false,
        renderCell:(params)=>{
            return (
                <>
                  <Link to={`/order/${params.getValue(params.id,"id")}`}>
                    <Tooltip title="Details" placement="top">
                      <LaunchIcon sx={{width:'30px', height:'30px', color:'#1976d2'}} />
                    </Tooltip>
                  </Link>
                </>
            )
        }
    },
  ];
  const rows=[];
  orders && orders.forEach(order => {
      rows.push({
          id:order._id,
          status:order.orderStatus,
          itemsQty:order.orderItems.length,
          amount:order.totalPrice
      })
  });
//end for grid rows and column-----------------------



  useEffect(() => {
    dispatch(getMyOrders({toast}));
  }, [dispatch]);

  return (
    <>
    {loading? <BoxShadowLoader/>:
       <div style={{display:'flex',flexDirection:'column',width:'100%',marginTop:'15px', textAlign:'center'}}>
        <Typography component="h1" variant="h5" sx={{m:'15px 0'}}>Full list of Orders</Typography>
        <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} components={{Toolbar:GridToolbar}} autoHeight/>
      </div>
    }
    </>
  )
}

export default MyOrders