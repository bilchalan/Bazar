import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:4000",
    withCredentials: true,
    headers:{"Content-Type": "application/form-data"}
});


//authentication & user
export const loginUserApi=(formData)=>API.post(`/api/v1/login`,formData);
export const loadUserApi=()=>API.get(`/api/v1/me`);
export const logoutApi=()=>API.get(`/api/v1/logout`);
export const registrationApi=(formData)=>API.post(`/api/v1/register`,formData);
export const updateProfileApi=(formData)=>API.put(`/api/v1/me/update`,formData);
export const updatePasswordApi=(formData)=>API.put(`/api/v1/password/update`,formData);
export const getAllUsersApi=()=>API.get(`/api/v1/admin/users`);
export const getUserDetailsApi=(id)=>API.get(`/api/v1/admin/user/${id}`);
export const updateUserRoleApi=(id,formData)=>API.put(`/api/v1/admin/user/${id}`,formData);
export const deleteUserApi=(id)=>API.delete(`/api/v1/admin/user/${id}`);
export const forgotPasswordApi=(formData)=>API.post(`/api/v1/password/forgot`, formData);
export const resetPasswordApi=(token,formData)=>API.put(`/api/v1/password/reset/${token}`, formData);

//category
export const getCategoriesApi=()=>API.get(`/api/v1/categories`);
export const getCategoryDetailsApi=(id)=>API.get(`/api/v1/admin/category/${id}`);
export const addNewCategoryApi=(formData)=>API.post(`/api/v1/admin/category/new`,formData);
export const updateCategoryApi=(id, formData)=>API.put(`/api/v1/admin/category/${id}`,formData);
export const deleteCategoryApi=(id)=>API.delete(`/api/v1/admin/category/${id}`,id);

//products
export const getProductsApi=(productParams)=>API.get(`/api/v1/products?${productParams}`);
export const getProductsDetailsApi=(id)=>API.get(`/api/v1/product/${id}`);
export const getAdminProductsApi=()=>API.get(`/api/v1/admin/products`);
export const addNewProductApi=(formData)=>API.post(`/api/v1/admin/product/new`,formData);
export const updateProductApi=(id,formData)=>API.put(`/api/v1/admin/product/${id}`,formData);
export const deleteProductApi=(id)=>API.delete(`/api/v1/admin/product/${id}`);

//orders
export const createOrderApi=(order)=>API.post(`/api/v1/order/new`,order,{headers: {"Content-Type": "application/json"}});
export const getMyOrdersApi=()=>API.get(`/api/v1/orders/me`);
export const getOrderDetailsApi=(id)=>API.get(`/api/v1/order/${id}`);
export const getAllOrdersApi=()=>API.get(`/api/v1/admin/orders`);
export const updateOrderApi=(id,formData)=>API.put(`/api/v1/admin/order/${id}`,formData);
export const deleteOrderApi=(id)=>API.delete(`/api/v1/admin/order/${id}`);

//review 
export const newReviewApi=(formData)=>API.put(`/api/v1/review`,formData);
export const getAllReviewsApi=(id)=>API.get(`/api/v1/reviews?id=${id}`);
export const deleteReviewApi=(reviewId,productId)=>API.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);