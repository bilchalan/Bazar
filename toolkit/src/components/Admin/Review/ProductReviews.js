import React, { useEffect,useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {Typography} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {getAllReviews, removeReviewsLoadError,deleteReview} from '../../../redux/features/reviewSlice';
import {getAdminProducts} from '../../../redux/features/productsSlice';

const ProductReviews = () => {
    const dispatch=useDispatch();
    const {products}=useSelector(state=>state.products.allProducts);
    const {error:revLoadError,reviews,loading:revLoading}=useSelector(state=>state.reviews.allReviews);
    const {isDeleted}=useSelector(state=>state.reviews.review);

    const [id,setId]=useState("");

    const deleteHandler=(reviewId)=>{
        let productId=id;
        dispatch(deleteReview({reviewId,productId,toast}));
    }

    const columns=[
        {field:"id",headerName:"Review ID",headerClassName:'gridHeader',hideable: true,minWidth:80,flex: .6},
        {field:"name",headerName:"User Name",headerClassName:'gridHeader',minWidth:150,flex: 1},
        {field:"rating",headerName:"Rating",headerClassName:'gridHeader',minWidth:100,flex:.6,type:'number',
            renderCell:(params)=>{
                return (
                    <>
                    <Stack spacing={1}>
                        <Rating value={params.value} size="small" precision={0.5} readOnly />
                    </Stack>   
                    </>

                )
            }
        },
        {field:"review", headerName:"Review",headerClassName:'gridHeader',minWidth:200,flex: 1.5},
        {field:"actions",headerName:"Actions",headerClassName:'gridHeader',minWidth:80,flex: .4,type:'number',sortable:false,
            renderCell:(params)=>{
                return (
                    <Tooltip title="Delete" placement="top">
                    <IconButton color='error' component="span"
                      /*   disabled={delLoading?true:false} */
                        onClick={()=>deleteHandler(params.getValue(params.id,"id"))}>
                        <DeleteForeverIcon sx={{width:'30px', height:'30px'}} />
                    </IconButton>
                    </Tooltip>
                )
            }
        },
    ];

    const rows=[];
    reviews && reviews.forEach(rev => {
        rows.push({
            id:rev._id,
            name:rev.name,
            rating:rev.rating,
            review:rev.comment
        })
    });


    const handleChange = (id) => {
        setId(id);
        if(id!==""){
            dispatch(getAllReviews(id));
        }
      };
    
    useEffect(()=>{
        if(revLoadError){
            toast.error(revLoadError);
            dispatch(removeReviewsLoadError());
        }
        if(isDeleted){
            
            dispatch(getAllReviews(id));
        }
        dispatch(getAdminProducts());
    },[dispatch,revLoadError,isDeleted,id]);

  return (
      <>
        <Box sx={{textAlign:'center'}}>
            <Box sx={{ maxWidth: 350,m:'0 auto',textAlign:'left' }}>
                <FormControl fullWidth>
                    <InputLabel id="productList">Products List</InputLabel>
                    <Select
                        labelId="productList"
                        id="productList"
                        value={id }
                        label="Products List"
                        onChange={((e)=>handleChange(e.target.value))}
                        >
                        {products && products.map((product)=>(
                            <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <hr/>
            {revLoading? <BoxShadowLoader/>:
            id?    
            
                (reviews && reviews.length>0 ?
                <>
                    <Typography component="h1" variant="h5" sx={{m:'15px 0'}}>{reviews.length} Review(s) Found for this product</Typography>
                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginTop:'15px', textAlign:'center'}}>
                    <DataGrid rows={rows} columns={columns} sx={{ m: 0 }} components={{Toolbar:GridToolbar}} autoHeight/>
                    </div>
                </>
                : "No reviews found")
            
            : "Select a product to view reviews"            
            }
        </Box>
      </>
  );
};

export default ProductReviews;
