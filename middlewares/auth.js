import jwt from 'jsonwebtoken'
import User from '../models/schema.js'

export const protect = async (req,res,next) => {
    let token = req.headers.authorization.split(" ")[1]
    try {
        const decoded = jwt.verify(token,"surya")
        const userId = decoded.id
        const user = await User.findById(userId)
        if(!user){
            return res.json({success:false,"message":"not authorized usser not found"})
        }
        req.user = user
        next()
    } catch (error) {
       return  res.status(401).json({"message":` ${error.message}`})
    }

}