import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


//new or edit review
export const newReview=createAsyncThunk("reviews/newReview", async({formData,toast},{rejectWithValue})=>{
    try{
        const {data}=await api.newReviewApi(formData);
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//get reviews
export const getAllReviews=createAsyncThunk("reviews/getAllReviews", async(id, thunkAPI)=>{
    try{
        const {data}=await api.getAllReviewsApi(id);
        return data.reviews;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

//delete review
export const deleteReview=createAsyncThunk("reviews/deleteReview", async({reviewId,productId,toast},{rejectWithValue})=>{
    try {        
        const { data } = await api.deleteReviewApi(reviewId,productId);
        toast.success("Review deleted successfully.");
        return data.success;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});
  
  
const reviewSlice=createSlice({
    name:"reviews",
    initialState:{
       newReview:{},
       allReviews:{reviews:[]},
       review:{}
    },
    reducers:{
        removeReviewsLoadError:(state)=>{
            state.allReviews.error=null;
        },
        resetNewReview:(state)=>{
            state.newReview.success=false;
        },
    },
    extraReducers:{
        //NEW REVIEW
        [newReview.pending]:(state,action)=>{
            state.newReview.loading=true;
        },
        [newReview.fulfilled]:(state,action)=>{
            state.newReview.loading=false;
            state.newReview.success=action.payload;
            state.newReview.error=null;
        },
        [newReview.rejected]:(state,action)=>{
            state.newReview.loading=false;
            state.newReview.error=action.payload;
        },
        //ALL REVIEWS
        [getAllReviews.pending]:(state,action)=>{
            state.allReviews.loading=true
        },
        [getAllReviews.fulfilled]:(state,action)=>{
            state.allReviews.loading=false;
            state.allReviews.reviews=action.payload;
            state.allReviews.error=null;
        },
        [getAllReviews.rejected]:(state,action)=>{
            state.allReviews.loading=false;
            state.allReviews.error=action.payload;
        },
        //DELETE A REVIEW
        [deleteReview.pending]:(state,action)=>{
            state.review.loading=true
        },
        [deleteReview.fulfilled]:(state,action)=>{
            state.review.loading=false;
            state.review.isDeleted=action.payload;
            state.review.error=null;
        },
        [deleteReview.rejected]:(state,action)=>{
            state.review.loading=false;
            state.review.error=action.payload;
        },
    }
});
export const {
    removeReviewsLoadError,
    resetNewReview,
} = reviewSlice.actions;
export default  reviewSlice.reducer;