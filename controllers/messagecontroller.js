import { Chat } from "../models/chat.js";
import axios from "axios";
import User from "../models/schema.js";

export const textMsgController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;
    const chat = await Chat.findOne({ userId: userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });
    const response = await axios.post("http://127.0.0.1:8000/post", {
      messages: prompt
    });
    const aiReply = response.data.reply;
    
    chat.messages.push({
      role: "assistant",
      content: aiReply,
      timestamp: Date.now(),
      isImage: false,
    });
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
    return res.json({
      success: true,
      reply: aiReply,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
