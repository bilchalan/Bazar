import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";



//get all products
export const getProducts=createAsyncThunk("products/getProducts", async({search, currentPage, priceRange, category, ratingsFilter,toast}, {rejectWithValue})=>{
    try{
        let key="keyword="+search;
        let page="&page="+currentPage;

        let price="&price[gte]="+priceRange[0]+"&price[lte]="+priceRange[1];

        let cat=null;
        if(category){
            cat="&category="+category;
        } else{
            cat="";
        }

        let ratings="";
        if(ratingsFilter>0 || ratingsFilter==="undifined"){
            ratings="&ratings[gte]="+ratingsFilter;
        }
        let productParams=key+page+price+cat+ratings;
        //const {data} = await axios.get(`/api/v1/products?${key+page+price+cat+ratings}`);
        const {data} = await api.getProductsApi(productParams);

        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//get products details
export const getProductDetails=createAsyncThunk("products/getProductDetails", async({id,toast,navigate}, {rejectWithValue})=>{
    try{        
        const {data}=await api.getProductsDetailsApi(id);
        return data.product;
    }catch(error){
        toast.error(error.response.data.message);
        if(error.response.status===404 || 400){
            navigate("/not-found");
        }else{
            navigate("/error");
        }
        return rejectWithValue(error.response.data.message);
    }
})

//for admin
//----------------------
//get all products
export const getAdminProducts=createAsyncThunk("products/getAdminProducts", async({toast}, {rejectWithValue})=>{
    try{

        const {data}=await api.getAdminProductsApi();
        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//new product
export const addNewProduct = createAsyncThunk("products/addNewProduct", async({formData,toast},{rejectWithValue})=>{
    try {
      const {data}=await api.addNewProductApi(formData);
      toast.success("New product added successfully");
      return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
  })

  //update product
export const updateProduct = createAsyncThunk("products/updateProduct", async({id,formData,toast},{rejectWithValue})=>{
    try {
      const {data}=await api.updateProductApi(id,formData);
      toast.success("Product updated successfully.");
      return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
  })

 //delete product
 export const deleteProduct = createAsyncThunk("products/deleteProduct", async({_id,toast},{rejectWithValue})=>{
    try {
        const {data}=await api.deleteProductApi(_id);
        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
  })



const productsSlice=createSlice({
    name:"products",
    initialState:{
        allProducts:{products:[]},
        productDetails:{product:{}},
        newProduct:{product:{}},
        product:{},
        },
    reducers:{
        removeAllProductsLoadError:(state,action)=>{
            state.allProducts.error=null;
        },
        removeProductDetailsError:(state)=>{
            state.productDetails.error=null;
        },
        removeAddNewProductError:(state,action)=>{
            state.newProduct.error=null;
        },
        resetAddNewProduct:(state,action)=>{
            state.newProduct.success=false;
        },
        removeUpdateProductError:(state,action)=>{
            state.product.error=null;
        },
        resetUpdateProduct:(state,action)=>{
            state.product.isUpdated=false;
        },
        removeDeleteProductError:(state,action)=>{
            state.product.error=false;
        },
        resetDeleteProduct:(state,action)=>{
            state.product.isDeleted=false;
        }        
    },
    extraReducers:{
        //ALL PRODUCTS
        [getProducts.pending]:(state,action)=>{
            state.allProducts.loading=true;
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.allProducts.loading=false;
            state.allProducts.products=action.payload.products;
            state.allProducts.productCount=action.payload.productCount;
            state.allProducts.resultPerPage=action.payload.resultPerPage;
            state.allProducts.filteredProductsCount=action.payload.filteredProductsCount;
        },
        [getProducts.rejected]:(state,action)=>{
            state.allProducts.loading=false;
            state.allProducts.error=action.payload;
        },
        //PRODUCT DETAILS-------------
        [getProductDetails.pending]:(state,action)=>{
            state.productDetails.loading=true
        },
        [getProductDetails.fulfilled]:(state,action)=>{
            state.productDetails.loading=false;
            state.productDetails.product=action.payload;
        },
        [getProductDetails.rejected]:(state,action)=>{
            state.productDetails.loading=false;
            state.productDetails.error=action.payload;
        },
        //GET ALL PRODUCTS FOR ADMIN
        [getAdminProducts.pending]:(state,action)=>{
            state.allProducts.loading=true
        },
        [getAdminProducts.fulfilled]:(state,action)=>{
            state.allProducts.loading=false;
            state.allProducts.products=action.payload.products;
        },
        [getAdminProducts.rejected]:(state,action)=>{
            state.allProducts.loading=false;
            state.allProducts.error=action.payload;
        },
        //ADD NEW PRODUCT
        [addNewProduct.pending]:(state,action)=>{
            state.newProduct.loading=true
        },
        [addNewProduct.fulfilled]:(state,action)=>{
            state.newProduct.loading=false;
            state.newProduct.success=action.payload.success;
            state.newProduct.product=action.payload.product;
        },
        [addNewProduct.rejected]:(state,action)=>{
            state.newProduct.loading=false;
            state.newProduct.error=action.payload;
        },
        //UPDATE PRODUCT
        [updateProduct.pending]:(state,action)=>{
            state.product.loading=true
        },
        [updateProduct.fulfilled]:(state,action)=>{
            state.product.loading=false;
            state.product.isUpdated=action.payload.success;
        },
        [updateProduct.rejected]:(state,action)=>{
            state.product.loading=false;
            state.product.error=action.payload;
        },
        //DELETE PRODUCT
        [deleteProduct.pending]:(state,action)=>{
            state.product.loading=true
        },
        [deleteProduct.fulfilled]:(state,action)=>{
            state.product.loading=false;
            state.product.isDeleted=action.payload.success;
        },
        [deleteProduct.rejected]:(state,action)=>{
            state.product.loading=false;
            state.product.error=action.payload;
        },        
    }
});

export const {
    removeAllProductsLoadError,
    removeProductDetailsError,
    removeAddNewProductError,
    resetAddNewProduct, 
    removeUpdateProductError, 
    resetUpdateProduct,
    removeDeleteProductError,
    resetDeleteProduct,
} = productsSlice.actions;
export default  productsSlice.reducer;