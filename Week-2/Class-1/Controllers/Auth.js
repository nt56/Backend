const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
    try{
        //get data
        const {name,email,password,role} = req.body;

        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User Already Exist',
            });

        }

        //secure password
        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'Error in hashing password',
            });
        }

        //create entry for user
        const user = await User.create({
            name,email,password:hashPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:true,
            message:"User Cannot be registered , try again later",
        });
    }
}

//login
exports.login = async (req, res) => {

    try{
        //data fetch
        const {email, password} = req.body;

        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill the all details carefully",
            });
        }

        //user check
        const user = await User.findOne({email});

        //if user not registered
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not exist",
            })
        }

        //payload
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }

        //verify password and generate JWT token
        if(await bcrypt.compare(password,user.password)){
            //password match --> by creating the JWT token
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                }
            );

            user.token = token;
            user.password = undefined;

            //creating options
            const options = {
                expires: new Date(Date.now() +3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            //creating cookie
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });
        }
        else{
            //password do not match
            return res.status(400).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"User Cannot be Login , try again later",
        });
    }

}