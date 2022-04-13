import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


//LOGIN USER FUNCTION-----------
export const login= createAsyncThunk("auth/login", async({formData,toast},{rejectWithValue})=>{
    try{
        const { data } = await api.loginUserApi(formData);        
        toast.success('Logged in successfully.');
        return data.user;
    }catch(error){  
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})
//LOAD USER FUNC-----
export const loadUser=createAsyncThunk("auth/loadUser", async(_,{rejectWithValue})=>{
    try{
         const { data } = await api.loadUserApi();          
        return data.user;
    }catch(error){       
        return rejectWithValue(error.response.data.message);
    }
})

//LOGOUT USER FUNC-----
export const logout=createAsyncThunk("auth/logout", async({toast},{rejectWithValue})=>{
    try{
        await api.logoutApi();        
        toast.success('Successfully logged out');      
    }catch(error){     
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//USER REGISTRATION FUNCTION-----------
export const registration= createAsyncThunk("auth/registration", async({formData,toast},{rejectWithValue})=>{
    try{
        const {data}=await api.registrationApi(formData);
        toast.success('Successfully signed up.');
        return data.user;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//USER UPDATE PROFILE FUNCTION-----------
export const updateProfile= createAsyncThunk("auth/updateProfile", async({formData,toast},{rejectWithValue})=>{
    try{
        const {data}=await api.updateProfileApi(formData);
        toast.success("Account updated successfully.");
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//USER UPDATE PASSWORD FUNCTION-----------
export const updatePassword= createAsyncThunk("auth/updatePassword", async({formData,toast},{rejectWithValue})=>{
    try{
        const { data } = await api.updatePasswordApi(formData);
        toast.success("Password changed successfully.");
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//ADMIN SECTION
//LOAD ALL USER FUNC-----
export const getAllUsers=createAsyncThunk("auth/getAllUsers", async({toast},{rejectWithValue})=>{
    try{         
        const { data } = await api.getAllUsersApi();
        return data.users;
    }catch(error){     
        toast.error(error.response.data.message);  
        return rejectWithValue(error.response.data.message);
    }
})

//GET SINGLE USER FUNCTION-----------
export const getUserDetails= createAsyncThunk("auth/getUserDetails", async({id,toast},{rejectWithValue})=>{
    try{        
        const { data } = await api.getUserDetailsApi(id);
        return data.user;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//UPDATE USER ROLE FUNCTION-----------
export const updateUserRole= createAsyncThunk("auth/updateUserRole", async({id,formData,toast},{rejectWithValue})=>{
    try{        
        const { data } = await api.updateUserRoleApi(id,formData);
        toast.success("User role changed.");
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//DELETE USER FUNCTION-----------
export const deleteUser= createAsyncThunk("auth/deleteUser", async({id,toast},{rejectWithValue})=>{
    try{        
        const { data } = await api.deleteUserApi(id);
        toast.success("User account deleted successfully.");
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//FORGOT PASSWORD FUNCTION-----------
export const forgotPassword= createAsyncThunk("auth/forgotPassword", async({formData,toast},{rejectWithValue})=>{
    try{
        const { data } = await api.forgotPasswordApi(formData);
        toast.success(data.message);
        return data.message;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//RESET PASSWORD WITH TOKEN FUNCTION-----------
export const resetPassword= createAsyncThunk("auth/resetPassword", async({token,formData,toast},{rejectWithValue})=>{
    try{
        const { data } = await api.resetPasswordApi(token,formData);
        toast.success("Password updated successfully");
        return data.success;
    }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})


const authSlice=createSlice({
    name:"auth",
    initialState:{
        userDetails:{user:{}},  
        profile:{},
        allUsers:{users:[]},
        singleUser:{user:{}},
        forgotPassword:{}
    },
    reducers:{
        removeError:(state)=>{    
            state.userDetails.error=null;
        },
        resetUpdateProfile:(state)=>{
            state.profile.isUpdated=false;
        }
    },
    extraReducers:{
        //user login
        [login.pending]:(state,action)=>{
            state.userDetails.loading=true;
        },
        [login.fulfilled]:(state,action)=>{
            state.userDetails.loading=false;
            state.userDetails.user=action.payload;    
            state.userDetails.isAuthenticated=true;
            state.userDetails.error=null;
        },
        [login.rejected]:(state,action)=>{
            state.userDetails.loading=false;
            //state.userDetails.error=action.payload;
            state.userDetails.isAuthenticated=false;         
        },
        //load logged user
        [loadUser.pending]:(state,action)=>{
            state.userDetails.loading=true
        },
        [loadUser.fulfilled]:(state,action)=>{            
            state.userDetails.loading=false;
            state.userDetails.user=action.payload;    
            state.userDetails.isAuthenticated=true;
        },
        [loadUser.rejected]:(state,action)=>{
            state.userDetails.loading=false;
            state.userDetails.error=action.payload;
            state.userDetails.isAuthenticated=false;            
        },
        //logout user
        [logout.pending]:(state)=>{
            state.userDetails.loading=true
        },
        [logout.fulfilled]:(state)=>{            
            state.userDetails.loading=false;
            state.userDetails.user=null;    
            state.userDetails.isAuthenticated=false;
        },
        [logout.rejected]:(state,action)=>{
            state.userDetails.loading=false;
            state.userDetails.error=action.payload;       
        },   
        //user registration
        [registration.pending]:(state)=>{
            state.userDetails.loading=true
        },
        [registration.fulfilled]:(state,action)=>{            
            state.userDetails.loading=false;
            state.userDetails.user=action.payload;    
            state.userDetails.isAuthenticated=true;
            state.userDetails.error=null;
        },
        [registration.rejected]:(state,action)=>{
            state.userDetails.loading=false;
            state.userDetails.error=action.payload;       
        },      
        //user update profile
        [updateProfile.pending]:(state)=>{
            state.profile.loading=true;
        },
        [updateProfile.fulfilled]:(state,action)=>{            
            state.profile.loading=false;
            state.profile.isUpdated=action.payload;  
            state.profile.error=null;   
        },
        [updateProfile.rejected]:(state,action)=>{
            state.profile.loading=false;
            state.profile.error=action.payload;       
        },
        //user update profile
        [updatePassword.pending]:(state)=>{
            state.profile.loading=true;
        },
        [updatePassword.fulfilled]:(state,action)=>{            
            state.profile.loading=false;
            state.profile.isUpdated=action.payload;  
            state.profile.error=null;   
        },
        [updatePassword.rejected]:(state,action)=>{
            state.profile.loading=false;
            state.profile.error=action.payload;       
        },               
        //load all users
        [getAllUsers.pending]:(state,action)=>{
            state.allUsers.loading=true
        },
        [getAllUsers.fulfilled]:(state,action)=>{            
            state.allUsers.loading=false;
            state.allUsers.users=action.payload;    
        },
        [getAllUsers.rejected]:(state,action)=>{
            state.allUsers.loading=false;
            state.allUsers.error=action.payload;           
        },
        //get user details
        [getUserDetails.pending]:(state,action)=>{
            state.singleUser.loading=true
        },
        [getUserDetails.fulfilled]:(state,action)=>{            
            state.singleUser.loading=false;
            state.singleUser.user=action.payload;    
        },
        [getUserDetails.rejected]:(state,action)=>{
            state.singleUser.loading=false;
            state.singleUser.error=action.payload;           
        },
        //update user role
        [updateUserRole.pending]:(state,action)=>{
            state.profile.loading=true
        },
        [updateUserRole.fulfilled]:(state,action)=>{            
            state.profile.loading=false;
            state.profile.isUpdated=action.payload;    
        },
        [updateUserRole.rejected]:(state,action)=>{
            state.profile.loading=false;
            state.profile.error=action.payload;           
        },
        //delete user
        [deleteUser.pending]:(state,action)=>{
            state.profile.loading=true
        },
        [deleteUser.fulfilled]:(state,action)=>{            
            state.profile.loading=false;
            state.profile.isDeleted=action.payload;    
        },
        [deleteUser.rejected]:(state,action)=>{
            state.profile.loading=false;
            state.profile.error=action.payload;           
        },
        //forgot password
        [forgotPassword.pending]:(state,action)=>{
            state.forgotPassword.loading=true;
        },
        [forgotPassword.fulfilled]:(state,action)=>{            
            state.forgotPassword.loading=false;
            state.forgotPassword.message=action.payload;    
        },
        [forgotPassword.rejected]:(state,action)=>{
            state.forgotPassword.loading=false;
            state.forgotPassword.error=action.payload;           
        },   
        //reset password
        [resetPassword.pending]:(state,action)=>{
            state.forgotPassword.loading=true;
        },
        [resetPassword.fulfilled]:(state,action)=>{            
            state.forgotPassword.loading=false;
            state.forgotPassword.success=action.payload;    
        },
        [resetPassword.rejected]:(state,action)=>{
            state.forgotPassword.loading=false;
            state.forgotPassword.error=action.payload;           
        },       
    }
});
export const {removeError,resetUpdateProfile} = authSlice.actions;
export default authSlice.reducer;