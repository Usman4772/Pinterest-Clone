const mongoose=require("mongoose")
const { stringify } = require("uuid")

const postSchema= new mongoose.Schema({
    postTitle:String,
    image:{
        type:String
    },
    postDescription:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model("post",postSchema)