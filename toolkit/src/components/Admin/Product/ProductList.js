import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { getAdminProducts } from '../../../redux/features/productsSlice';
import {deleteProduct} from '../../../redux/features/productsSlice';

const ProductList = () => {
  const dispatch=useDispatch();
  const {loading,products}=useSelector((state)=>state.products.allProducts);
  const {isDeleted}=useSelector(state=>state.products.product)


  const deleteHandler=(_id)=>{
    dispatch(deleteProduct({_id,toast}));    
}
  //for grid rows and column-----------------------
  const columns=[
    {field:"id",headerName:"Product ID",headerClassName:'gridHeader',hideable: true,minWidth:80,flex: .6},
    {field:"name",headerName:"Product Name",headerClassName:'gridHeader',minWidth:150,flex: 1},
    {field:"description",headerName:"Description",headerClassName:'gridHeader',minWidth:150,flex: 1.5},
    {field:"price",headerName:"Price",headerClassName:'gridHeader',minWidth:80,flex:.4,type:'number',},
    {field:"ratings",headerName:"Ratings",headerClassName:'gridHeader',minWidth:100,flex:.6,type:'number',
      renderCell:(params)=>{
        return (
        <Stack spacing={1}>
          <Rating value={params.value} size="small" precision={0.5} readOnly />
        </Stack>
        )
      }
    },
    {field:"stock",headerName:"Stock",headerClassName:'gridHeader',minWidth:50,flex:.3,type:'number',},    
    {field:"actions", headerName:"Actions",headerClassName:'gridHeader',minWidth:90,flex: .4,type:'number',sortable:false,
        renderCell:(params)=>{
            return (
                <>
                  <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                    <Tooltip title="Edit" placement="top">
                      <EditIcon sx={{width:'30px', height:'30px', color:'#1976d2'}} />
                    </Tooltip>
                  </Link>

                  <Tooltip title="Delete" placement="top">
                  <IconButton color='error' component="span" onClick={()=>deleteHandler(params.getValue(params.id,"id"))}>
                      <DeleteForeverIcon sx={{width:'30px', height:'30px'}} />
                  </IconButton>
                  </Tooltip>
                </>
            )
        }
    },
  ];
  const rows=[];
  products && products.forEach(product => {
      rows.push({
          id:product._id,
          name:product.name,
          description:product.description,
          price:product.price,
          ratings:product.ratings,
          stock:product.stock
      })
  });
//end for grid rows and column-----------------------



  useEffect(() => {
    dispatch(getAdminProducts({toast}));
    if(isDeleted){
      toast.success('Product deleted successfully.');
    }
  }, [dispatch,isDeleted]);

  return (
    <>
      {loading ? <BoxShadowLoader/> :
        <div style={{display:'flex',flexDirection:'column',width:'100%',marginTop:'15px', textAlign:'center'}}>
          <Typography component="h1" variant="h5" sx={{m:'15px 0'}}>Full list of products</Typography>
          <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} components={{Toolbar:GridToolbar}} autoHeight/>
        </div>
      }
    </>
  )
}

export default ProductList