import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


//add items to the cart
export const addItemsToCart=createAsyncThunk("cart/addItemsToCart", async({id,quantity},{rejectWithValue})=>{
    try{
        const {data}=await api.getProductsDetailsApi(id);     
        return {
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                quantity                
            }
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
})

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:{products: localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []},
        shippingInfo:{shipInfo:localStorage.getItem("shipInfo") ? JSON.parse(localStorage.getItem("shipInfo")): {}},
    },
    reducers:{
        removeItem:(state,action)=>{
            const newItems= state.cartItems.products.filter((i) => i.product !== action.payload);
            state.cartItems.products=newItems;
            localStorage.setItem("products", JSON.stringify(newItems));            
        },
        saveShippingInfo:(state,action)=>{
            state.shippingInfo.shipInfo=action.payload;
            localStorage.setItem("shipInfo", JSON.stringify(state.shippingInfo.shipInfo));
        },
        removeAllStorage:(state)=>{
            if (localStorage.getItem("products") !== null) {
                localStorage.removeItem("products");
                state.cartItems.products=[];
            }
            if (localStorage.getItem("shipInfo") !== null) {
                localStorage.removeItem("shipInfo");
                state.shippingInfo.shipInfo={};
            }
            if (sessionStorage.getItem("orderInfo") !== null) {
                sessionStorage.removeItem("orderInfo");
            }
        }
    },       
    extraReducers:{
        //CARTS add
        [addItemsToCart.pending]:(state,action)=>{
            state.cartItems.loading=true
        },
        [addItemsToCart.fulfilled]:(state,action)=>{
            state.cartItems.loading=false;

            const item = action.payload;
            if(Array.isArray(state.cartItems.products) && state.cartItems.products.length<1){
                state.cartItems.products= [item];
            }else{
                const isItemExist = state.cartItems.products.find(i => i.product === item.product)
                if (isItemExist) {
                    state.cartItems.products=state.cartItems.products.map(i => i.product === isItemExist.product ? item : i)
                } else {
                    state.cartItems.products= [...state.cartItems.products, item]
                } 
            }
                       
            localStorage.setItem("products", JSON.stringify(state.cartItems.products));
        },
        [addItemsToCart.rejected]:(state,action)=>{
            state.cartItems.loading=false;
            state.cartItems.error=action.payload;
        },

    }
});

export const {removeItem,saveShippingInfo,removeAllStorage} = cartSlice.actions;
export default  cartSlice.reducer;