import React from 'react';
import {Skeleton,Card,Box } from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <div className="productCard">
        <Card sx={{minHeight:'365px'}} className='box-shadow'>
            <Skeleton variant="rectangular" width="100%" animation="wave" >
                <div style={{ paddingTop: '140px' }} />
            </Skeleton>
            <Box sx={{p:1}}>
                <Skeleton width="100%" animation="wave" height={60} ></Skeleton>
                <Skeleton width="70%" animation="wave" height={35}  sx={{m:'0 auto'}}/>
                <Skeleton width="55%" animation="wave" height={35}  sx={{m:'0 auto'}} />
                <Skeleton width="100%" animation="wave" height={35} />
                <Skeleton width="100%" animation="wave" height={35}  />                
            </Box>
        </Card>
    </div>
  )
}

export default ProductCardSkeleton