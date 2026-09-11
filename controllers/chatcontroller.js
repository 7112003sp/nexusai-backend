import { Chat } from "../models/chat.js"

export const createChat = async (req,res) => {
    try {
        const user_id = req.user._id   
        const chatData = {
            userId:user_id,
            messages:[],
            name:"new chat",
            userName:req.user.name
        }
        await Chat.create(chatData)
        return res.json({success:true,"message":"chat created"})
    } catch (error) {
        return res.json({success:false,"message":error.message})
    }
}
export const getChat = async (req,res) => {
    try {
        const userId = req.user._id   
        const chatts = await Chat.find({userId:userId}).sort({updatedAt :- 1})
        return res.json({success:true,chatts})
    } catch (error) {
        return res.json({success:false,"message":error.message})
    }
}

export const deleteChat = async (req,res) => {
    try {
        const userId = req.user._id   
       const {chatId} = req.body
       await Chat.deleteOne({_id:chatId,userId})
        return res.json({success:true,"messages":"deleted"})
    } catch (error) {
        return res.json({success:false,"message":error.message})
    }
}