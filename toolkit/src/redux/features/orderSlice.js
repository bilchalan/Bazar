import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../api';


//new or edit review
export const createOrder=createAsyncThunk("orders/createOrder", async({order,toast},{rejectWithValue})=>{
    try{
        const {data} = await api.createOrderApi(order);
        toast.success("Payment Successfully Completed.");
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//get my orders
export const getMyOrders=createAsyncThunk("orders/getMyOrders", async({toast},{rejectWithValue})=>{
    try{
        const {data} = await api.getMyOrdersApi();
        return data.orders;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//get my order details
export const getOrderDetails=createAsyncThunk("orders/getOrderDetails", async({id,toast},{rejectWithValue})=>{
    try{
        const {data} = await api.getOrderDetailsApi(id);
        return data.order;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//admin section
//get orders list
export const getAllOrders=createAsyncThunk("orders/getAllOrders", async({toast}, {rejectWithValue})=>{
    try{
        const {data} = await api.getAllOrdersApi();
        return data.orders;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//update order process
export const updateOrder=createAsyncThunk("orders/updateOrder", async({id,formData,toast},{rejectWithValue})=>{
    try{
        const {data} = await api.updateOrderApi(id,formData);        
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//delete order 
export const deleteOrder=createAsyncThunk("orders/deleteOrder", async({id,toast},{rejectWithValue})=>{
    try{
        const {data} = await api.deleteOrderApi(id);        
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

const orderSlice=createSlice({
    name:"orders",
    initialState:{
        newOrder:{},
        myOrders:{orders:[]},
        orderDetails:{order:{}},
        allOrders:{orders:[]},
        order:{}
        },
    reducers:{
        resetNewOrder:(state)=>{
            state.newOrder.success=false;
        },
        removeMyOrdersLoadError:(state)=>{
            state.myOrders.error=null;
        },
        resetOrder:(state)=>{
            state.order.isUpdated=false;
        },
    },
    extraReducers:{
        //NEW ORDER
        [createOrder.pending]:(state,action)=>{
            state.newOrder.loading=true;
        },
        [createOrder.fulfilled]:(state,action)=>{
            state.newOrder.loading=false;
            state.newOrder.success=action.payload;
            state.newOrder.error=null;
        },
        [createOrder.rejected]:(state,action)=>{
            state.newOrder.loading=false;
            state.newOrder.error=action.payload;
        },
        //MY ORDERS LIST
        [getMyOrders.pending]:(state)=>{
            state.myOrders.loading=true;
        },
        [getMyOrders.fulfilled]:(state,action)=>{
            state.myOrders.loading=false;
            state.myOrders.orders=action.payload;
            state.myOrders.error=null;
        },
        [getMyOrders.rejected]:(state,action)=>{
            state.myOrders.loading=false;
            state.myOrders.error=action.payload;
        },   
        //MY ORDER DETAILS
        [getOrderDetails.pending]:(state)=>{
            state.orderDetails.loading=true;
        },
        [getOrderDetails.fulfilled]:(state,action)=>{
            state.orderDetails.loading=false;
            state.orderDetails.order=action.payload;
            state.orderDetails.error=null;
        },
        [getOrderDetails.rejected]:(state,action)=>{
            state.orderDetails.loading=false;
            state.orderDetails.error=action.payload;
        },  
        //ADMIN SECTION   
        //ALL ORDERS LIST
        [getAllOrders.pending]:(state)=>{
            state.allOrders.loading=true;
        },
        [getAllOrders.fulfilled]:(state,action)=>{
            state.allOrders.loading=false;
            state.allOrders.orders=action.payload;
            state.allOrders.error=null;
        },
        [getAllOrders.rejected]:(state,action)=>{
            state.allOrders.loading=false;
            state.allOrders.error=action.payload;
        },    
        //UPDATE ORDER PROCESS
        [updateOrder.pending]:(state)=>{
            state.order.loading=true;
        },
        [updateOrder.fulfilled]:(state,action)=>{
            state.order.loading=false;
            state.order.isUpdated=action.payload;
            state.order.error=null;
        },
        [updateOrder.rejected]:(state,action)=>{
            state.order.loading=false;
            state.order.error=action.payload;
        }, 
        //DELETE ORDER 
        [deleteOrder.pending]:(state)=>{
            state.order.loading=true;
        },
        [deleteOrder.fulfilled]:(state,action)=>{
            state.order.loading=false;
            state.order.isDeleted=action.payload;
            state.order.error=null;
        },
        [deleteOrder.rejected]:(state,action)=>{
            state.order.loading=false;
            state.order.error=action.payload;
        },        
    }
});
export const {
    resetNewOrder,
    removeMyOrdersLoadError,
    resetOrder
} = orderSlice.actions;
export default  orderSlice.reducer;