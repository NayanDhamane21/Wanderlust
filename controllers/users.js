
const User=require("../models/user.js");




module.exports.rendersignup=(req,res)=>{
  res.render("users/signup.ejs");
}

module.exports.signup=async(req,res,next)=>{
  try{
    let {username,email,password}=req.body;
   const newuser=new User({username,email});
   const registeredUser=await User.register(newuser,password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
     if(err){
       return next(err)
     }
     req.flash("success","sign up successfully");
    res.redirect("/listings");

   })  //passport madhala aahe
   
  }catch(e){
    console.log(e.message)
    req.flash("error",e.message);
    res.redirect("/signup");
  }
}

module.exports.renderlogin=(req,res)=>{
   res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","login successfully")
    res.redirect(res.locals.redirectUrl || "/listings");  //direct login jar kela tar te listings var zanar
}

module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{  //he functionality passport madhech aahe 
    if(err){
      return next(err)
    }
    req.flash("success","you are logout");
    res.redirect("/listings");
  })
}