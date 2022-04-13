import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {useParams, useNavigate} from "react-router-dom";

import {getProductDetails} from '../../redux/features/productsSlice';
import ProductDetailsImageCarouselCard from './ProductDetailsImageCarouselCard.js';
import ProductDetailsInfoCard from './ProductDetailsInfoCard.js';
import ReviewListCard from './ReviewListCard';
import './ProductDetails.css';
import {newReview, resetNewReview} from '../../redux/features/reviewSlice';
import BoxShadowLoader  from '../../components/Skeleton/BoxShadowLoader';

import {Dialog,DialogActions,DialogContent,DialogTitle,Button,TextareaAutosize,Rating,Stack, Divider, Typography} from '@mui/material';



const ProductDetails = () => {

  const navigate=useNavigate();
  const {id}=useParams();

  const dispatch=useDispatch();
  const {loading, product}=useSelector(state => state.products.productDetails);
  const {success}=useSelector(state=>state.reviews.newReview);

  const [open, setOpen] = useState(false);
  const [submitRating, setSubmitRating] = useState(5);
  const [submitReview, setSubmitReview] = useState("");

  const handleSubmitReviewRating=()=>{
    setOpen(false);
    const formData=new FormData();
    formData.set("rating",submitRating);
    formData.set("comment",submitReview);
    formData.set("productId",product._id);

    dispatch(newReview({formData,toast}));
  }


  useEffect(() => {
    if(success){
      toast.success('Thank you for your valuable review.');
      dispatch(resetNewReview());
    }
    dispatch(getProductDetails({id,toast,navigate}));   
  }, [dispatch,id,success,navigate]);

  return (
    <>
      {loading ? <BoxShadowLoader/> :(
            <>
            <div className="product-details">
                <div className="product-images-carousel">
                    {product.images && <ProductDetailsImageCarouselCard images={product.images} />}
                </div>
                <div className='product-info'>
                {product && <ProductDetailsInfoCard product={product} />}
                </div>
            </div>



            <div className='product-reviews'>
                <div className='reviews' style={{textAlign:'center'}}>

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



                    {product.reviews && product.reviews[0] ? (
                        <div className='review'>
                        {product.reviews && product.reviews.map((review)=>(<ReviewListCard review={review} key={review._id}/>))}
                        </div>
                    ):( 
                      <Typography variant="button" display="block">No reviews yet.</Typography> 
                    )}
                </div>
            </div>
            </>
      )}
                       
    </>
  )
}

export default ProductDetails