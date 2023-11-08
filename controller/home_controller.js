const users=require('../models/users');
const feedback=require('../models/feedback');
// const CsvParser = require('json2csv').Parser;

// home shows list of student and inerview. We can also update/create/delete both
module.exports.home=async function(req,res){
    try{  
        let signeduser=req.user, feedbackReq 
        //if user is admin, find all feedback and send to template
        if (signeduser.role == 'admin' || signeduser.role == 'Admin') {
            feedbackReq= await feedback.find({}).sort('-createdAt')
        } 
        //if user is not an admin, select only those fedbacks that neds to be reviewed by user
        else {
            let id=signeduser._id
            feedbackReq= await feedback.find({by:id});
        }
        //incase there are no feedbacks, send empty array to avoid rrors on frontend
        if (feedbackReq == null){
            feedbackReq=[]
        }
        let user=await users.find({}).sort('-createdAt')
        return res.render('home',{title:'Home',employee:user, feedbackReq:feedbackReq});
    }catch(err){
        console.log("Error",err);
        return;
    };
}