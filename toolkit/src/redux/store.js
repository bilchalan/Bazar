import {configureStore} from "@reduxjs/toolkit";
import CategoryReducer from './features/categorySlice';
import ProductsReducer from "./features/productsSlice";
import CartReducer from "./features/cartSlice";
import AuthReducer from "./features/authSlice";
import ReviewReducer from "./features/reviewSlice";
import OrderReducer from "./features/orderSlice";


export default configureStore({
    reducer:{
        products:ProductsReducer,
        auth:AuthReducer,
        categories:CategoryReducer,
        cart:CartReducer,
        reviews:ReviewReducer,
        orders:OrderReducer
    }
})