const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

//use routes
const feedbackController=require('../controller/feedback_controller');
router.get('/create',feedbackController.feedback);
router.post('/create',feedbackController.create);
router.get('/update/:id',feedbackController.updateView);
router.post('/update/:id',feedbackController.update);
router.get('/delete/:id',feedbackController.delete);
console.log("feedback routes loaded");

module.exports=router;
