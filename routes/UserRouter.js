const express = require('express');
const user_router = express();
const userController = require('../controller/UserController')
const session = require('express-session');
const userValidate = require('../Authentication/UserAuthentication')
const nocache = require('nocache')
const flash = require('connect-flash')



user_router.use(nocache())
user_router.use(session({
    secret:'secret',
    resave : true,
    saveUninitialized:true
}))
user_router.use(flash())
user_router.use(express.json())
user_router.use(express.urlencoded({ extended: false }))
// setting view engine
user_router.set('view engine','ejs')
user_router.set('views','./views')

//  Handling request from user
user_router.get('/',userController.userHome)
user_router.get('/login',userValidate.isLogout,userController.login)
user_router.post('/Userlogin',userController.validate)
// User Dashboard
user_router.get('/userDashboard',userValidate.isLogin,userController.UserDash)




// signup setting
user_router.get('/signup',userController.Signup)
user_router.post('/signup',userController.SignupCreation)
// logout
user_router.get('/logout',userValidate.isLogin,userController.logout)

module.exports = user_router;