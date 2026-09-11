import User from "../models/schema.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const genarateTokken = (id) => {
    const tokken = jwt.sign({id},"surya",{
        expiresIn:'30d'
    })
    return tokken
}
export const registerUser = async (req,res) => {
    let {name,email,psw} = req.body
    try {
        const userIsExist = await User.findOne({email})
        if(userIsExist){
            return res.json({"success":"false","message":"user already existed"})
        }
        const user = await User.create({
            name,
            email,
            psw
        })
        const tokken = genarateTokken(user._id)
        return res.json({success:true,tokken})
        
    } catch (error) {
        return res.json({success:false,"message":error.message})
    }
}
export const loginUser = async(req,res) => {
    const {email,psw} = req.body
    try {
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.json({success:false,"message":"the user not exist please create account"})
        }
        const isMatch = await bcrypt.compare(psw,userExist.psw)
        if(isMatch){
            const token = genarateTokken(userExist._id)
            return res.json({success:true,token})
        }
        return res.json({success:false,"message":"invalid email or psw"})
        
    } catch (error) {
         return res.json({success:false,"message":error.message})
    }
}

export const getUser = async(req,res) => {
    try {
        const user  = req.user
        return res.json({success:true,user})
    } catch (error) {
         return res.json({success:false,"message":error.message})
    }
}