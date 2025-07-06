const mongoose =require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");
main()
.then(()=>{
    console.log("connection successful")
})

.catch(err => console.log(err));
  async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initDB=async()=>{
    await listing.deleteMany({});
   const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "685bbfb85c634d7fa85b53fa",
  }));

  await listing.insertMany(updatedData);
  console.log("Data inserted successfully:");
}

initDB();