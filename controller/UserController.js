
// connecting mongodb
const collection = require('../models/Mongoos')



//  home page rendering
const userHome = ((req,res)=>{
    res.render('Home',{title:"YourSpace"})
})



// Login page rendering
   const login = ((req,res)=>{
    res.render('login',{title:"Login"})
   })



//    login validate
const validate = async (req,res)=> {
    try{
        const password = req.body.password;
        const UserdataFromURL = await collection.findOne({name:req.body.name});
        console.log(UserdataFromURL)
    if(UserdataFromURL){
        if(UserdataFromURL.password === req.body.password){
          req.session.user_id = UserdataFromURL.name;
          res.redirect('/userDashboard')
          console.log("login Successfull");
        }
        else {
                res.render('login',{ message: "Password Incorrect" })
                console.log("wrong password");
             }
        }
        else {
            res.render('login',{ message: "Username Incorrect" })
         }
   
      }
      catch(error) {
         res.send(error.messsage)
      }

    }
 
// user Dashboard
const UserDash = (req,res)=>{
    const user = req.session.user_id;
    console.log(user)
    res.render('userDashboard' , {title:user})
} 



//Signup page rendering
const Signup = ((req,res)=>{
    res.render('signup',{title:"Signup"})
})



// sign post action handle
const SignupCreation = async(req,res)=>{
try{
     const data = new collection({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        password:req.body.password,
        isAdmin:0
    })

    if(data){
    const insert = await collection.insertMany([data])
    console.log(insert);
    // req.flash({messsage:"signin completed"})
    res.json({message:"successful"})
    }else{
        res.render('/signup',{messsage:"invalid"})
    }
}catch (error) {
    console.log(error.message);
   }
}



//logout
const logout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/')

    } catch (error) {
        console.log(error.message);
    }
}





























module.exports = {
                  userHome,
                  login,
                  Signup,
                  SignupCreation,
                  validate,
                  UserDash,
                  logout
                  }
