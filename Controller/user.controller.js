import userModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register API
export function userRegistration(req, res) {
    const { userName, email, password, avatar} = req.body;

    userModel.findOne({email}).then((data) => {
        if(data){
            return res.status(403).send({message: "User already exist!"});
        }

        try{
            const newUser = new userModel({
                userName: userName,
                email: email,
                password: bcrypt.hashSync(password, 10),
                avatar: avatar
            });
            newUser.save();
            res.status(201).send({success: true, message: "User Successfully Registered", user: newUser});
        }
        catch(err){
            res.status(500).send({success: false, message: "Serve Error", error: err});
        }
    });
}

// Login API
export function userLogin(req, res){
    const { email, password } = req.body;
    try{
        userModel.findOne({email}).then((data) => {
            if(!data){
                return res.status(404).send({message: "User not found!, Please Register"});
            }
            const isMatch = bcrypt.compareSync(password, data.password);
            if(!isMatch){
                return res.status(401).send({message: "Invalid Password!"});
            }
            const accessToken = jwt.sign({id: data._id}, "secretKey" ,{expiresIn: "3h"});

            res.send({
                success: true,
                message: "User Login Successfully",
                user: {
                    id: data._id,
                    userName: data.userName,
                    email: data.email,
                    avatar: data.avatar
                },
                token: accessToken
            });
        })
    }catch(err){
        res.status(500).send({success: false, message: "Serve Error", error: err});
    }
}