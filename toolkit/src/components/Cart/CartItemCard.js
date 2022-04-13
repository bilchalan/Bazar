import React from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Button from '@mui/material/Button';

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <>
      <div className="item-details">
      <Card sx={{ display: 'flex', width: '98%',boxShadow:0 }}>

        <Box sx={{ display: 'flex'}}>
          <CardMedia component="img" sx={{maxWidth:'150px',maxHeight:'120px'}} image={item.image} alt={item.name}/>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

          <CardContent sx={{ flex: '1 0 auto',p:1 }}>
            <Typography variant="button" display="block">Name : {item.name}</Typography>
            <Typography variant="overline" display="block">Price : {item.price}</Typography>            
          </CardContent>

          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button color="error" 
                    variant="outlined" 
                    startIcon={<DeleteIcon />} 
                    onClick={()=>deleteCartItems(item.id)}>
                    Remove
            </Button>
          </Box>

        </Box>
      </Card>
      </div>
    </>
  );
};

export default CartItemCard;
