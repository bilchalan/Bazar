const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Category name."],
        trim:true,
        unique:[true, "This category is Exists"],
    },
    description:{
        type:String,
        required:[true,"Please enter category description."]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:String,
        default:Date.now
    }
})

module.exports=mongoose.model("Category",categorySchema);