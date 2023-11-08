const mongoose=require('mongoose');

const feedbackSchema=mongoose.Schema({
    for:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    forName:{
        type:String,
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    byName:{
        type:String,
    },
    rating:{
        type:Number,
    },
    review:{
        type:String,
    },
    status:{
        type:String,
    }
},
    {
        timestamps:true,
    }
);

const feedback=mongoose.model('feedback',feedbackSchema);
module.exports=feedback;