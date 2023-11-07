const collection = require('../models/Mongoos')

// Admin home page
const AdminHome = (req, res) => {
    res.render('Home', { title: "AdminHome" })
    console.log("admin home")
}

// Admin Login 
const AdminLogin = (req, res) => {
    res.render('AdminLogin')
}
// Validating Admin
const Admin_Validate = async (req, res) => {
    try {
        const name = req.body.name;
        console.log(name)
        const DataFromUrl = await collection.findOne({ name: req.body.name })
        if (DataFromUrl) {
            if (DataFromUrl.password === req.body.password) {
                req.session.admin_id = DataFromUrl.name
                const find = await collection.find({})
                res.render('AdminDash', { find: find })

            }
        } else {
            res.render('AdminLogin')
        }
    } catch (error) {
        console.log(error.message)

    }
}
// Search
const Admin_Search = async (req, res) => {
    try {
        const find = await collection.find({
            $or: [
                { name: req.body.search },
                { email: req.body.search }
            ]
        });
        console.log(find)
        res.render('AdminDash', { find: find })
    } catch (error) {

    }

}
// RESET
const AdminReset = async (req, res) => {
    const reset = await collection.find({})
    res.render('AdminDash', { find: reset })
}
// ADDUSER
const Adduser = (req, res) => {
    res.render('signup')
}
// ADDUSER POST METHOD
const AddUserData =  async(req,res)=>{
    try {
            const data =   new collection( {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            password: req.body.password,
            isAdmin:0
        })
        console.log(data)
        
        // const name = req.body.name.trim();
        // console.log(name);
          
        if(name.length === 0){
             req.flash("title", "Enter a valid Name") 
             res.render('signup')
         }else{
           const insertData = await collection.insertMany([data]);
           console.log(insertData);
           res.redirect('/admin/AdminDash')
         }
    } catch (error) {
        console.log(error.message)
    }
}


// Update User

const update = async (req, res) => {
    try {
        const id = req.query.id
        // console.log(id)
        const userdata = await collection.findById({ _id: id })
        res.render('UpdateUser', { userdata: userdata })
    } catch (error) {
        console.log(error.message)
    }
}

// update post method
const updateSave = async (req, res) => {
    try {
        const updateid= req.body.id;
        console.log(updateid)
        console.log(req.body.name,req.body.email);
        const updatedata = await collection.updateOne({_id:updateid},{$set:{name:req.body.name,email:req.body.email,gender:req.body.gender}})
        
        res.json({message:"successful"})
        res.redirect('/admin/AdminDash')
        console.log(updatedata)
       
    } catch (error) {
        console.log(error.message)
    }
}

const Dash = async (req, res) => {
    const title = req.flash("title")
    console.log(title);
    const find = await collection.find({})
    res.render('AdminDash', { find: find })
}
// delete user
const deletuser = async (req, res) => {
    try {
        const user1 = req.query.userid;
        console.log(user1)
        await collection.deleteOne({ _id: user1 })
        const deluser = await collection.find({})
        res.render('AdminDash', { find: deluser })
    } catch (error) {
        console.log(error.message)

    }
}
// logout
const logout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin/adminlogin')

    } catch (error) {
        console.log(error.message);
    }
}





module.exports = {
    AdminHome,
    AdminLogin,
    Admin_Validate,
    Admin_Search,
    AdminReset,
    Adduser,
    AddUserData,
    update,
    updateSave,
    Dash,
    deletuser,
    logout
}