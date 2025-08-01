const Listing=require("../models/listing.js")

module.exports.index= async(req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}

module.exports.rendernewform=(req, res) => {
  
  res.render("listings/new.ejs");
}

module.exports.showlisting=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path:"reviews",
    populate:{
      path:"author",
    },
  }).populate("owner");
  if(!listing){
    req.flash("error","listing does not exist");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}

module.exports.createlisting=async (req, res) => {
   let url=req.file.path;
   let filename=req.file.filename;
   
  
  const newListing = new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  req.flash("success","new listing created");
  res.redirect("/listings");
  
}

module.exports.rendereditform=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","listing does not exist");
    return res.redirect("/listings");
  }
  let originalimageurl=listing.image.url;
  originalimageurl=originalimageurl.replace("/uploads","/upload/h_300,w_250")
  res.render("listings/edit.ejs", { listing,originalimageurl });
}

module.exports.updatelisting=async (req, res) => {
  let { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined"){
       let url=req.file.path;
        let filename=req.file.filename;
       listing.image={url,filename};
        await listing.save();
  }
  
  req.flash("success","updated");

  res.redirect(`/listings/${id}`);
}

module.exports.deletelisting=async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","listing deleted");

  res.redirect("/listings");
}