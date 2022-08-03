const express = require("express");
const AdminRouter = express.Router();
const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

AdminRouter.post("/admin/signin", async(req, res)=> {
    const {username, email, password} = req.body;

    let Users;
    try {
        Users = await Admin.findOne({email});
    } catch (error) {
        console.log(error);
    }

    if(Users){
        return res.status(400).json({message: "User Already Found"});
    }

    const hassedPassword = bcrypt.hashSync(password);


    const user = new Admin({
        username, email, password: hassedPassword, Products:[]
    })

    try {
      await user.save();
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({user})

})

AdminRouter.post("/admin/signup", async(req, res) => {
    const {email, password} = req.body;

    let Users;
    try {
        Users = await Admin.findOne({email});
    } catch (error) {
        console.log(error);
    }

    if(!Users){
        return res.status(400).json({message:"Email Id Found"});
    }


    const isMatchPassword = bcrypt.compareSync(password, Users.password);

    if(!isMatchPassword){
        return res.status(400).json({message:"password Incorrect"});
    }

    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY,
        {
            "expiresIn":"1h"
        }
        );

        return res.status(200).json({data: token, message: "Login Successfully", user: Users});

});


AdminRouter.get("/admin/:id", async(req, res) => {
    const id = req.params.id;

    let As;
    try {
        As = await Admin.findById(id);
    } catch (error) {
        console.log(error);
    }
    return res.status(200).json({As})
})

module.exports = AdminRouter;