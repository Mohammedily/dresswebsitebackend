const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../model/cart");
const CartRouter = express.Router();
const Client = require("../model/Client")


CartRouter.post("/cart/post", async(req,res) => {
    const {_id, title, image, price, category, noofquantity, description, quantity, size, adminId, clientId} = req.body;

    let Ca;
    try {
       Ca = await Client.findById(clientId); 
    } catch (error) {
        console.log(error);
    }

    if(!Ca){
        return res.status(400).json({message:"no id found"})
    }

    const Car = new Cart({
        _id, title, image, price, category, noofquantity, description, quantity, size, adminId, clientId
    })
try {
    const session = await mongoose.startSession();
     session.startTransaction();
   await Car.save({ session });
   Ca.Carts.push(Car);
   await Ca.save({session});
   await session.commitTransaction();
} catch (error) {
  console.log(error);    
}

return res.status(200).json({Car});

})


CartRouter.get("/client/cart/get/:id", async(req, res) => {
    let Existing;
    try {
        Existing = await Client.findById(req.params.id).populate("Carts");
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({Existing});

})


CartRouter.delete("/client/cart/delete/:id", async(req, res) => {
   
    const id = req.params.id;

    let cart;

    try {
        cart = await Cart.findByIdAndRemove(id).populate("clientId");
        await cart.clientId.Carts.pull(cart);
        await cart.clientId.save();
    } catch (error) {
        console.log(error);
    }
    if(!cart){
        return res.status(404).json({message:"unable to find id"})
    }
    
    return res.status(200).json({message:"deleted successfull"});

})



module.exports = CartRouter;