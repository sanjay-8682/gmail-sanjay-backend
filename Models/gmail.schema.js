import mongoose from "mongoose"

const gmailSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    subject:{
        type:String,
        required:true,
        
    },
    Text:{
        type:String,
        required:true,

    },

 });

const Gmail= mongoose.model('Gmail',gmailSchema)

export default Gmail;
