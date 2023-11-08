const express=require('express');
//for router
const router=express.Router();
const passport=require('passport');

//use routes
const homeController=require('../controller/home_controller');
router.get('/',passport.checkAuthentication,homeController.home);
router.use('/feedback',passport.checkAuthentication,require('./feedback'));
router.use('/user',require('./user'));
console.log("routes loaded");

module.exports=router;
