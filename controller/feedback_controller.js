const feedback=require('../models/feedback');
const users=require('../models/users');
const { ObjectId } = require('mongodb');

//get request to feedback page wih a form to create new fedback
//this endpoint is accessible only by admin
module.exports.feedback=async function(req,res){
  try{
    let user=await users.find({}).sort('-createdAt')
    return res.render('feedback',{title:'Create Feedback',employee:user});
  }catch(err){
    console.log("Error",err);
    return;
  };
}

//post request from feedback page to create new feedback
//this endpoint is accessible only by admin
module.exports.create=async function(req,res){
    try{
        console.log("Feedback data", req.body)
        let empby=await users.findById(req.body.by);
        let empfor=await users.findById(req.body.for);
        console.log(empby)
        console.log(empfor)
       
        let newFeedback=await feedback.create(
            {
               for: req.body.for,
               by: req.body.by,
               forName : empfor.name,
               byName: empby.name,
               //for every new fedback form, status will be in progress
               status: "In Progress"
            });
            
            console.log("employee",empby)
            //push the feedback form to the employe who needs to submit review 
            empby.feedback_request.push(newFeedback);
            res.redirect("/");
        }catch(err){
            console.log("Error",err);
            return;
        };     
}

//post req to update feedback form, all filds pre-filled with existing data
module.exports.updateView=async function(req,res){
    try{
        let feed=await feedback.findById(req.params.id)
    return res.render('feedback_update',{title:'Update Feedback',feedback:feed});
}catch(err){
    console.log("Error",err);
    return;
};
}
//post req to update feedback data
module.exports.update=async function(req,res){
    try{
         feedback.findOneAndUpdate(
            { "_id": req.params.id },
            {
              $set: {
                review: req.body.review,
                rating: req.body.rating,
                //status will be updated to completed
                status: "Completed"
             }
            },
            { new: true } // This option returns the updated document
          )
          .then(updatedFeedback=> {
            res.redirect('/')
          })
          .catch(error => {
            console.log("Error in updating feedback", error)
            return;
          });
          
        res.redirect('/')
                
        }catch(err){
        console.log("Error",err);
        req.flash('Error','Error occured');
        return;
    }
}

//delete feedback
module.exports.delete=async function(req,res){
    try {
        let id=req.params.id;

        await feedback.findByIdAndDelete(id);
        //delete feedback from user table also
        await users.deleteMany({feedback_request:id});
    
        return res.redirect("/");
      } catch (error) {
        // Handle any errors that may occur during the deletion
        console.error(error);
      }
}