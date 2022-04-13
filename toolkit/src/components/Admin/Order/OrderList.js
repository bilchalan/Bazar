import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

import {deleteOrder, getAllOrders} from '../../../redux/features/orderSlice';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

const OrderList = () => {
  const dispatch=useDispatch();
  const {loading,orders}=useSelector((state)=>state.orders.allOrders);
  const {isDeleted,loading:deleting}=useSelector((state)=>state.orders.order);

  const deleteHandler=(id)=>{
    dispatch(deleteOrder({id,toast}));
  }
  //for grid rows and column-----------------------
  const columns=[
    {field:"id",headerName:"Order ID",headerClassName:'gridHeader',hideable: true,minWidth:85,flex: 1},
    {field:"status",headerName:"Status",headerClassName:'gridHeader',minWidth:95,flex: 1},
    {field:"itemsQty",headerName:"Items",headerClassName:'gridHeader',minWidth:60,type:'number',flex: 1},
    {field:"amount",headerName:"Amount",headerClassName:'gridHeader',minWidth:80,flex:1,type:'number',},     
    {field:"actions", headerName:"Actions",headerClassName:'gridHeader',minWidth:90,flex: .4,type:'number',sortable:false,
      renderCell:(params)=>{
        return (
            <>
              {deleting?
                <Box sx={{display:'flex'}}>
                  <Tooltip title="Deleting" placement="top">
                    <CircularProgress size={30} />
                  </Tooltip>
                </Box>
              :
                <Tooltip title="Delete" placement="top">
                  <IconButton color='error' component="span"
                      onClick={()=>deleteHandler(params.getValue(params.id,"id"))}>
                      <DeleteForeverIcon sx={{width:'30px', height:'30px'}} />
                  </IconButton>
                </Tooltip>
              }

              <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                <Tooltip title="Edit" placement="top">
                  <EditIcon sx={{width:'30px', height:'30px', color:'#1976d2'}} />
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
          itemsQty:order.orderItems.length,
          amount:order.totalPrice,
          status:order.orderStatus
      })
  });
//end for grid rows and column-----------------------

  useEffect(() => {
    dispatch(getAllOrders({toast}));
    if(isDeleted){
      toast.success('Order deleted successfully.');
    } 
  }, [dispatch,isDeleted]);

  return (
    loading?<BoxShadowLoader/> :
      <div style={{display:'flex',flexDirection:'column',width:'100%',marginTop:'15px', textAlign:'center'}}>
        <Typography component="h1" variant="h5" sx={{m:'15px 0'}}>Full list of orders</Typography>
        <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} components={{Toolbar:GridToolbar}} autoHeight/>
      </div>
    
  )
}

export default OrderList