import Gmail from '../Models/gmail.schema.js';
import User from '../Models/user.schema.js';
import nodemailer from 'nodemailer'; 
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
       user:"sanjaysanjay132002@gmail.com",
       pass:"ggrhjgigarblegrp"
    }
})

//SignUp for User

export const registerUser =async(req,res)=>{
    try {
        console.log(req.body);
        const {username,password,email}=req.body
        if(!password){
            return res.status(400).json({message:"password required"})
        }
        const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
       const hashPassword= await bcrypt.hash(password,10)
       //console.log("hashPassword",hashPassword);

       const newUser=new User({username,email,password:hashPassword})
       await newUser.save()
      res.status(200).json({message:"User registered Successfully", data:newUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Register failed, Internal error"})
    }
}

//Login User

export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
       const user= await User.findOne({email})
       if(!user){
        return res.status(401).json({message:"User not found"})
       }

      const passwordMatch= await bcrypt.compare(password,user.password)
      if(!passwordMatch){
        return res.status(401).json({message:"Invalid user password"})
      }

      const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
      res.status(200).json({message:"Login Successfully",token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Login failed, Internal error"})
    }
}

export const getUserById=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(err);
        res.status(500).json({err:"eroor in get user by id"})
    }
}



//ComposeMail

export const gmailSend=async(req,res)=>{
 
    try {
        console.log(req.body);
        const {email,subject,Text}=req.body;
    
            const mailOptions={
                from:"sanjaysanjay132002@gmail.com",
                to:email,
                subject:subject,
                Text:Text
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(400).json({status:400,message:"email not send"})
                }else{
                    console.log("Email send",info.response);
                    res.status(200).json({status:200,message:"email sent Succesccfully"})
                }

 
            })
        
                const newGmail=new Gmail({email,subject,Text})
                await newGmail.save()
                res.status(200).json({message:"Email sent Successfully", data:newGmail})
              
                 
    } catch (error) {
        console.log(error);
        res.status(400).json({status:400,message:"internel Error"})
    }
}