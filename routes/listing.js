const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")


const Listing = require("../models/listing.js");
const {islogin,isowner,validatelisting}=require("../middlewares.js")
const listingcontroller=require("../controllers/listings.js")
const multer  = require('multer')
const storage= require("../cloudconfig.js")
const upload = multer(storage)

router
.route("/")
.get( wrapAsync(listingcontroller.index))
.post(islogin,
   
upload.single('listing[image]'),  //image ke data ko req.file me data le aayega multer
     validatelisting,
    wrapAsync(listingcontroller.createlisting));


//New Route

router.get("/new",islogin,listingcontroller.rendernewform );


router.route("/:id").put(islogin,isowner,upload.single('listing[image]'),validatelisting ,wrapAsync(listingcontroller.updatelisting)).delete(islogin,isowner,wrapAsync(listingcontroller.deletelisting));




//Show Route
router.get("/:id", wrapAsync(listingcontroller.showlisting));




//Edit Route
router.get("/:id/edit",islogin,validatelisting, wrapAsync(listingcontroller.rendereditform));

//Update Route

//Delete Route


module.exports=router;