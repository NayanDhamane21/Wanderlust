const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")


const Listing = require("../models/listing.js");
const Review=require("../models/review.js");
const {validatereview,islogin,isreviewauthor}=require("../middlewares.js")
const reviewcontroller=require("../controllers/reviews.js");



//REVIEWS
//POST REVIEWS

router.post("/", islogin,validatereview,wrapAsync(reviewcontroller.createreview));

//delete review route
router.delete("/:reviewId",islogin,isreviewauthor,wrapAsync(reviewcontroller.deletereview))
module.exports=router;