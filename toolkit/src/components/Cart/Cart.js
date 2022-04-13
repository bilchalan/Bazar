import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, Link} from "react-router-dom";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Button from '@mui/material/Button';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import CartItemCard from "./CartItemCard";
import {addItemsToCart, removeItem} from '../../redux/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart.cartItems);

  const increaseQuantity = (id, qty, stock) => {
    const quantity = qty + 1;
    if (stock <= qty) {
      return;
    }
    dispatch(addItemsToCart({id, quantity}));
  };

  const decreaseQuantity = (id, qty) => {
    const quantity = qty - 1;
    if (1 >= qty) {
      return;
    }
    dispatch(addItemsToCart({id, quantity}));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItem(id));
  };

  const navigate=useNavigate();
  const checkOutHandler=()=>{
    navigate("/auth", { state: { path: "/cart/shipping" } })
  }

  return (
    products.length>0 ? ( 
    <div className="cart-items">
      <div className="cart-header">
        <Typography variant="button" display="block">Product</Typography>
        <Typography variant="button" display="block" style={{textAlign:'center'}}>Quantity</Typography>
        <Typography variant="button" display="block" style={{textAlign:'right'}}>Subtotal</Typography>
      </div>

      {products &&
        products.map((item) => (
          <div className="cart-body" key={item.product}>
            <CartItemCard key={item.product} item={item} deleteCartItems={deleteCartItems}/>

            <div className="item-quantity" style={{textAlign:'center'}}>
                <div className='btn-quantity' style={{margin:0}}>
                    <Tooltip title="Decrease Quantity" placement="top">
                    <IconButton color='error' 
                                component="span" 
                                onClick={()=>decreaseQuantity(item.product,item.quantity,item.stock)}>
                        <RemoveCircleIcon sx={{width:'30px', height:'30px'}} />
                    </IconButton>
                    </Tooltip>
                    <label>{item.quantity}</label>
                    <Tooltip title="Increase Quantity" placement="top">
                    <IconButton color='success' 
                                component="span" 
                                onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>
                        <AddCircleIcon sx={{width:'30px', height:'30px'}} />
                    </IconButton>
                    </Tooltip>                                           
                </div>
            </div>

            <Typography className="item-subtotal" variant="button" display="block">{item.quantity * item.price}</Typography>
          </div>
        ))}
        <div className="cart-total-price">
            <Typography className="item-subtotal" variant="button" display="block">
                Total : {products.reduce((acc,item)=>acc+item.quantity*item.price,0)}
            </Typography>            
        </div>
        <div className="checkout">
            <Button variant="contained" 
                    startIcon={<ShoppingCartCheckoutIcon />} 
                    onClick={checkOutHandler}>Check Out                    
            </Button>
        </div>


    </div>
    ) : (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography variant="h4" component="div">Cart is Empty!!!</Typography>
        <RemoveShoppingCartIcon sx={{width:'80px', height:'80px',color:'red'}} />

        <Link to="/">Back to home</Link>
      </div>
    )
    
  );
};

export default Cart;
