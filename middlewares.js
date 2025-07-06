const Listing = require("./models/listing.js");
const{listingschema}=require("./schema.js");
const{reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js")
const Review = require("./models/review.js"); 



module.exports.islogin=(req,res,next)=>{

    if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl;
       req.flash("error","login first");
       return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isowner=async(req,res,next)=>{
      let { id } = req.params;
      let listing=await Listing.findById(id);
      if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not owner");
        return res.redirect(`/listings/${id}`);
      }

      next()
}

module.exports.validatelisting=(req,res,next)=>{
   let {error}=listingschema.validate(req.body);
  
   if(error){
    let errormsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errormsg);
   }else{
     next();
   }

}

module.exports.validatereview=(req,res,next)=>{
   let {error}=reviewSchema.validate(req.body);
  
   if(error){
    let errormsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errormsg);
   }else{
     next();
   }

}
 module.exports.isreviewauthor=async(req,res,next)=>{
      let { id,reviewId } = req.params;
      let review=await Review.findById(reviewId);
      if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not owner");
        return res.redirect(`/listings/${id}`);
      }
    
      next()
 }
