import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

//get all categories
export const getCategories=createAsyncThunk("categories/getCategories", async({toast}, {rejectWithValue})=>{
    try{
        const {data}=await api.getCategoriesApi();
        return data.categories;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//admin
//get category details
export const getCategoryDetails=createAsyncThunk("categories/getCategoryDetails", async({id,toast}, thunkAPI)=>{
    try{        
        const {data}=await api.getCategoryDetailsApi(id);
        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
 
//new category
export const addNewCategory = createAsyncThunk("categories/addNewCategory", async({formData,toast},{rejectWithValue})=>{
    try {
        const {data}=await api.addNewCategoryApi(formData);
        toast.success("New category added");
        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
  })
 //update category
 export const updateCategory = createAsyncThunk("categories/updateCategory", async({id,formData,toast},{rejectWithValue})=>{
    try {
        const {data}=await api.updateCategoryApi(id,formData);
        toast.success("Category updated");
        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
  })

 //delete category
 export const deleteCategory = createAsyncThunk("categories/deleteCategory", async({id,toast},{rejectWithValue})=>{
    try {
        const {data}=await api.deleteCategoryApi(id);        
        return data;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
  })

const categorySlice=createSlice({
    name:"categories",
    initialState:{
            allCategories:{},
            categoryDetails:{},
            newCategory:{category:{}},
            category:{},
        },

    reducers:{
        removeAllCategoriesLoadError:(state,action)=>{
            state.allCategories.error=null;
        },
        //remove category details error
        removeCategoryLoadError:(state,action)=>{
            state.categoryDetails.error=null;
        },
        //for create
        removeAddNewCategoryError:(state,action)=>{
            state.newCategory.error=null;
        },
        resetAddNewCategory:(state,action)=>{
            state.newCategory.success=false;
        },
        //for update
        removeUpdateCategoryError:(state,action)=>{
            state.category.error=null;
        },
        resetUpdateCategory:(state,action)=>{
            state.category.isDeleted=false;
        },
        //for delete
        removeDeleteCategoryError:(state,action)=>{
            state.category.error=null;
        },
        resetDeleteCategory:(state,action)=>{
            state.category.isDeleted=false;
        },
    },
    extraReducers:{
        //ALL PRODUCTS
        [getCategories.pending]:(state,action)=>{
            state.allCategories.loading=true
        },
        [getCategories.fulfilled]:(state,action)=>{
            state.allCategories.loading=false;
            state.allCategories.categories=action.payload;
        },
        [getCategories.rejected]:(state,action)=>{
            state.allCategories.loading=false;
            state.allCategories.error=action.payload;
        },
        //CATEGORY DETAILS-------------
        [getCategoryDetails.pending]:(state,action)=>{
            state.categoryDetails.loading=true
        },
        [getCategoryDetails.fulfilled]:(state,action)=>{
            state.categoryDetails.loading=false;
            state.categoryDetails.category=action.payload.category;
        },
        [getCategoryDetails.rejected]:(state,action)=>{
            state.categoryDetails.loading=false;
            state.categoryDetails.error=action.payload;
        },
        //ADD NEW CATEGORY
        [addNewCategory.pending]:(state,action)=>{
            state.newCategory.loading=true
        },
        [addNewCategory.fulfilled]:(state,action)=>{
            state.newCategory.loading=false;
            state.newCategory.success=action.payload.success;
            state.newCategory.product=action.payload.product;
        },
        [addNewCategory.rejected]:(state,action)=>{
            state.newCategory.loading=false;
            state.newCategory.error=action.payload;
        },
        //UPDATE CATEGORY
        [updateCategory.pending]:(state,action)=>{
            state.category.loading=true
        },
        [updateCategory.fulfilled]:(state,action)=>{
            state.category.loading=false;
            state.category.isUpdated=action.payload.success;
        },
        [updateCategory.rejected]:(state,action)=>{
            state.category.loading=false;
            state.category.error=action.payload;
        },
        //DELETE CATEGORY
        [deleteCategory.pending]:(state,action)=>{
            state.category.loading=true
        },
        [deleteCategory.fulfilled]:(state,action)=>{
            state.category.loading=false;
            state.category.isDeleted=action.payload.success;
        },
        [deleteCategory.rejected]:(state,action)=>{
            state.category.loading=false;
            state.category.error=action.payload;
        },  
    }
});
export const {
    removeAllCategoriesLoadError,
    removeCategoryLoadError,
    removeAddNewCategoryError,
    resetAddNewCategory,
    removeUpdateCategoryError,
    resetUpdateCategory,
    removeDeleteCategoryError,
    resetDeleteCategory,
} = categorySlice.actions;

export default  categorySlice.reducer;