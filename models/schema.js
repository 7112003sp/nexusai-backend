import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    psw:{type:String,required:true},
    credits:{type:Number,default:20}
})
userSchema.pre('save',async function(){
    if(!this.isModified("psw")){
        return 
    }
    const salt = await bcrypt.genSalt(10)
    this.psw = await bcrypt.hash(this.psw,salt)
})
const User = mongoose.model("gptUsers",userSchema)

export default User