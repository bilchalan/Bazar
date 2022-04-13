
import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {toast} from 'react-toastify';

import {Dialog,DialogActions,DialogContent,DialogTitle,Button,TextareaAutosize,Rating,Stack, Divider} from '@mui/material';

import {newReview} from '../../redux/features/reviewSlice';

const ReviewSubmitCard = (id) => {
    const dispatch=useDispatch();

    const [open, setOpen] = useState(false);
    const [submitRating, setSubmitRating] = useState(5);
    const [submitReview, setSubmitReview] = useState("");    

    const handleSubmitReviewRating=()=>{
        setOpen(false);
        const formData=new FormData();
        formData.set("rating",submitRating);
        formData.set("comment",submitReview);
        formData.set("productId",id.productId);

        dispatch(newReview({formData,toast}));
    }

    const {success}=useSelector(state=>state.reviews.newReview);
    useEffect(() => {
        if(success){
            toast.success('Thank you for your valuable review.');            
        }
    }, [success])

  return (
    <>
    <br/><Divider/>
    <Button  type="submit" variant="contained" sx={{ mt: 3, mb: 2}} onClick={()=>setOpen(true)}>Submit Review</Button>
    <h2>Reviews</h2>                    
    <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle sx={{bgcolor: 'primary.main',mb:2, color:'#fff' }}>Review &#38; Rating</DialogTitle>

        <DialogContent sx={{minWidth:'350px'}}>
            <Stack spacing={1} sx={{mb: 2, width:'130px'}}>
                <Rating value={submitRating} size="small" onChange={(e,newValue)=>setSubmitRating(newValue)} />
            </Stack>
            <TextareaAutosize style={{width:'100%',padding:0}} minRows={4} value={submitReview} onChange={(e)=>setSubmitReview(e.target.value)} />
            <DialogActions sx={{width:'100%', p:0}}>
            <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2}} onClick={()=>setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2}} onClick={handleSubmitReviewRating}>Submit</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
    
    </>
  )
}

export default ReviewSubmitCard