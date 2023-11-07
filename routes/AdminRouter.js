const express = require('express')
const Admin = express();
const AdminController = require('../controller/AdminController')
const session = require('express-session')
const flash = require('flash')
const Admin_Authentication = require('../Authentication/AdminAuthentication')
const nocache = require('nocache')
const Adminflash = require('connect-flash')


Admin.use(Adminflash())
Admin.use(nocache())
Admin.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
// SETTING VIEW ENGINE
Admin.set('view engine', 'ejs')
Admin.set('views', './views')


// PARSING INCOMING DATA
Admin.use(express.json())
Admin.use(express.urlencoded({ extended: false}))
Admin.use(flash())
// AdminHome
Admin.get('/', Admin_Authentication.isLogout, AdminController.AdminHome)
// Admin Login
Admin.get('/adminlogin', Admin_Authentication.isLogout, AdminController.AdminLogin)
Admin.post('/adminlogin', AdminController.Admin_Validate)
// Admin.get('/AdminDash', Admin_Authentication.isLogin, AdminController.Dash)
// Setting Search Button
Admin.post('/search', AdminController.Admin_Search)
// Setting Reset Button
Admin.get('/reset', AdminController.AdminReset)

// update
Admin.get('/update', AdminController.update)
Admin.post('/update', AdminController.updateSave)
Admin.get('/AdminDash', AdminController.Dash)
// delete
Admin.get('/delete', AdminController.deletuser)
// Logout
Admin.get('/logout', Admin_Authentication.isLogin, AdminController.logout)









module.exports = Admin