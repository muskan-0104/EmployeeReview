const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    feedback_request:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'feedback',
    }],
    feedback_status:{
        type:String,
    },
},
    {
        timestamps:true,
    }
);

const users=mongoose.model('users',userSchema);
module.exports=users;