import React from "react";
import {useNavigate} from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

//import material ui
import { Card,CardActionArea,CardContent,CardMedia,Typography } from '@mui/material';

function ProductCard({product}) {

    const navigate=useNavigate();
    const linkToDetails = () => {navigate(`/product/${product._id}`)};
    
    return (
        <div className="productCard">       
            <CardActionArea>     
                <Card className='box-shadow' onClick={linkToDetails} sx={{minHeight:'365px'}}>                
                    <CardMedia component="img" alt={product.name} height="140" image={product.images[0].url}/>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                        </Typography>
                        <Stack spacing={1} style={{display:'block'}}>
                            <Rating value={product.ratings} readOnly precision={0.1}/>
                        </Stack>
                        <Typography variant="caption" display="block" gutterBottom color="text.secondary">
                            Reviews({product.numOfReviews})
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            View details &#38; buy.
                        </Typography>             
                    </CardContent>                                
                </Card>
            </CardActionArea>
        </div>
    )
}

export default ProductCard
