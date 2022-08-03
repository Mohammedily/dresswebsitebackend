const express = require("express");
const orderrouter = express.Router();
const Order = require("../model/Order");
const Client = require("../model/Client");
const mongoose = require("mongoose");





orderrouter.post("/client/order/post", async(req, res) => {
    

    const {token, totalPrice, item, clientId} = req.body;
    let existingUser;
    try {
        existingUser = await Client.findById({_id: clientId});
    }catch(err) {
        console.log(err)
    }
    
    if(!existingUser) {
        return res.status(500).json({ message : "unable to find by id"})
    }

    let order;
    try {
        order = await Order.create({
            email: token.email,
            source: token.id,
            name: token.card.name,
            amount: totalPrice,
              currency: "inr", 
              shippingAddress :{
                address:token.card.address_line1,
                city:token.card.address_city,
                country:token.card.address_country,
                postalCode: token.card.address_zip
              } ,
            item,
              clientId,
              orderstatus:"order pending"
            
        })
        const session = await mongoose.startSession();
        session.startTransaction();
        await order.save({session});
        existingUser.Orders.push(order);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({order});

})


orderrouter.get("/client/order/:id", async(req, res) => {
    const _id = req.params.id;
    let order;
    try {
        order = await Client.findById(_id).populate("Orders");
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({order})

})

orderrouter.get("/client/order/detial/:id", async(req, res) => {
   const _id = req.params.id;

    let Or;
    try {
        Or = await Order.findById(_id);
    } catch (error) {
     console.log(error);     
    }

    return res.status(200).json({Or});

})




module.exports = orderrouter;