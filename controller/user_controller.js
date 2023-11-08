const users=require('../models/users');

//signup
module.exports.signup=function(req,res){

    return res.render('signup',{title:'Sign Up',err:req.query.err});
}

//create user after signup redirect
module.exports.user=async function(req,res){
    //check if email alrady exists
    let email=await users.findOne({email:req.body.email});
    if(email!=null)
    {
        req.flash('error',"Email already exists");
        return res.redirect("/user/signup");
    }
    
   else
    {
        console.log(req.body.name)
        users.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
        }).catch((err)=>{
                console.log("Error while creating record",err);
            }).then((newUser)=>{
                console.log("New user signed up ",newUser);
            });

        res.redirect("/");
    }
        
}

//login
module.exports.login=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login',{title:'LogIn'});
}

module.exports.createSession=function(req,res){
    req.flash('success','Logged In Successfully');
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.redirect('/');
}
//logout
module.exports.destroySession=function(req,res){
    req.logout(function(){
        console.log('logout');
    });
    req.flash('success','Logged Out Successfully');
    return res.redirect('/');
}

//update user profile
module.exports.update=async function(req,res){
    try{
        users.findOneAndUpdate(
           { "_id": req.params.id },
           {
             $set: {
                name:req.body.name,
                email:req.body.email,
                role:req.body.role,
            }
           },
           { new: true } // This option returns the updated document
         )
         .then(updatedStudent=> {
           res.redirect('/')
         })
         .catch(error => {
           console.log("Error in updating employee", error)
           return;
         });
    }catch(err){
        console.log("Error",err);
        req.flash('Error','Error occured');
        return;
    }
}

//get request to delete user
module.exports.delete=async function(req,res){
    try{
        let userId=req.params.id;
        await users.findByIdAndDelete(userId);
            
        return res.redirect("/");
    }catch(err){
        console.log('Error',err);
        return;
    }
}

//get request to update page with a form to update user detail, all fields prefiled
// with existing data
module.exports.updateView=async function(req,res){
    try{
        let user=await users.findById(req.params.id)
    return res.render('employee_update',{title:'Update Employee',employee:user});
}catch(err){
    console.log("Error",err);
    return;
};
}
