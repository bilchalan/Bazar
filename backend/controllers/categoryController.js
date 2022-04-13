const Category=require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");

//create category
exports.createCategory= catchAsyncErrors(async(req,res,next)=>{
    req.body.user=req.user.id;
    const category=await Category.create(req.body);
    res.status(201).json({success:true,category});
});

// get all category
exports.getAllCategories=catchAsyncErrors(async (req, res, next)=>{
    const categories=await Category.find();
    res.status(201).json({categories});
});

//GET FUNCTION. category DETAILS
exports.getCategoryDetails=catchAsyncErrors(async (req, res, next)=>{
    let category=await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("category not found",404));
    }
    res.status(200).json({success:true,category});
});

// update category
exports.updateCategory=catchAsyncErrors(async (req, res, next)=>{
    let category=await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("Category not found",404)); 
    }
    category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidator:true,useFindAndModify:false});
    res.status(201).json({success:true,category});
});

//delete category
exports.deleteCategory=catchAsyncErrors(async (req, res, next)=>{
    let category=await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("category not found",404));
    }
    await category.remove();
    res.status(200).json({success:true, message:"Category deleted successfully"});
});