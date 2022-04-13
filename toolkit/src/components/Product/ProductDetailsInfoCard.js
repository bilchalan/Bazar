import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import {Box, Typography, Button  } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



import {addItemsToCart} from '../../redux/features/cartSlice';


const ProductDetailsInfoCard = ({product}) => {
    const dispatch=useDispatch();
      //product quantity
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity=()=>{

      if(product.stock<=quantity) return;

      const qty=quantity+1;
      setQuantity(qty);        
  }
  const decreaseQuantity=()=>{

      if(1===quantity) return;

      const qty=quantity-1;
      setQuantity(qty); 
  }
  //end product quantity

  const addToCartHandler=()=>{
      const id=product._id;
    dispatch(addItemsToCart({id,quantity})); 
    toast.success("Items added to cart");      
  }

  return (
    <>    
    <Box sx={{ display: 'flex',flexDirection: 'column'}}>
        <Typography variant="h6" component="div" style={{lineHeight:.9}}>{product.name}</Typography>
        <Box className='rating-review'>
            <Stack spacing={1}>
                <Rating value={product.ratings} readOnly precision={0.1}/>
            </Stack>
            <Typography variant="caption" display="block">Reviews: {product.numOfReviews}</Typography>                        
        </Box>
        <Typography variant="button" display="block">Price : {product.price}</Typography> 

        <Box className='btn-cart'>
            <Box className='btn-quantity'>
                <Tooltip title="Decrease Quantity" placement="top">
                <IconButton color='error' component="span" onClick={decreaseQuantity}>
                    <RemoveCircleIcon sx={{width:'40px', height:'40px'}} />
                </IconButton>
                </Tooltip>
                <label>{quantity}</label>
                <Tooltip title="Increase Quantity" placement="top">
                <IconButton color='success' component="span" onClick={increaseQuantity}>
                    <AddCircleIcon sx={{width:'40px', height:'40px'}} />
                </IconButton>
                </Tooltip>                                           
            </Box>
            <Button variant="contained" className="addtocart"
                    endIcon={<AddShoppingCartIcon/>} 
                    onClick={addToCartHandler}>Add to cart                    
            </Button>
        </Box>

        <Box>
            <Typography variant="body2" style={{display:'inline-block'}}><b>Status :</b> </Typography>
            <Typography variant="subtitle2" component="div" className={product.stock <1 ? "redColor":"greenColor"} style={{display:'inline-block'}}>
                {product.stock <1 ? " Out of Stock":" InStock"}
            </Typography>
        </Box>
        <Typography variant="body2" style={{whiteSpace:'pre-line'}}><b>Description :</b> {product.description}</Typography>
    </Box>
    </>
  )
}

export default ProductDetailsInfoCard