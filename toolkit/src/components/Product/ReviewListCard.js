import React from 'react';

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {Box, Avatar,Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ReviewListCard({review}) {

    return (
        <Box sx={{margin:'0 auto', marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center', padding: 2, border:'1px solid #dadada' }}>
            <Avatar sx={{bgcolor: 'primary.main', height:'80px', width:'80px',fontSize:'5.35rem' }}>
                {!review ? <AccountCircleIcon fontSize='2.5rem' /> :
                <img src={review.avatar_url} alt={review.name} style={{width:80, height:80}}/>
                }              
            </Avatar>

            <Typography variant="h6" component="div">{review.name}</Typography>
            <div style={{width:'122px', margin:'0 auto'}}>
                <Stack spacing={1}>
                    <Rating value={review.rating} readOnly />
                </Stack>
            </div>
            <Typography variant="body2" sx={{whiteSpace:'pre-line',textAlign:'left'}}>{review.comment}</Typography>     
        </Box>
    )
}

export default ReviewListCard
