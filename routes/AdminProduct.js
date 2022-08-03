const express = require("express");
const mongoose = require("mongoose");
const AdminProduct = require("../model/AdminProductPost");
const Admin = require("../model/Admin");
const AdminProductRouter = express.Router();



AdminProductRouter.post("/admin/product/post", async(req, res) => {
    const {title, image, price, category, noofquantity, description, adminId} = req.body;

    let AdminId;
    try {
        AdminId = await Admin.findById(adminId);
    } catch (error) {
        console.log(error);
    }
    
    if(!AdminId){
        return res.status(200).json({message:"No AdminId Found"});
    }

  

    const Product  = new AdminProduct({
        title, image , price ,category,noofquantity, description, adminId   
    })

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Product.save({ session });
    AdminId.Products.push(Product);
    await AdminId.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({Product});

})

AdminProductRouter.get("/admin/product/length", async(req, res) => {
let Products;
try {
  Products = await AdminProduct.find();
} catch (error) {
  console.log(error);
}
return res.status(200).json({Products});
})


AdminProductRouter.get("/client/product/limit", async(req, res) => {
  let Product;
  try {
    Product = await AdminProduct.find().limit(3);
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({Product})
})

AdminProductRouter.get("/client/product/get", async(req, res) => {
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const total = await AdminProduct.countDocuments({});
  const product = await AdminProduct.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
  res.json({totalPages: Math.ceil(total / PAGE_SIZE),product});
})

AdminProductRouter.get("/client/product/get/:id", async(req, res) => {
const id = req.params.id;
let Product;
try {
  Product = await AdminProduct.findById(id);
} catch (error) {
  console.log(error);
}
return res.status(200).json({Product})
})

module.exports = AdminProductRouter;