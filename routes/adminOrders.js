const express = require("express");
const adminorder = express.Router();
const Order = require("../model/Order");

adminorder.get("/admin/order/get", async(req, res) => {
    let oesa;
    try {
        oesa = await Order.find();
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({oesa});

})

adminorder.patch("/admin/update/:id", async(req, res) => {
    const id = req.params.id;

    const {orderstatus} = req.body;

    let Os;
    try {
        Os = await Order.findByIdAndUpdate(id, {orderstatus})
    } catch (error) {
        console.log(error);
    }
 
    return res.status(200).json({message: "Update Sucessfully"})
 
})

module.exports = adminorder;