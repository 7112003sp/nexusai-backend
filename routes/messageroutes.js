import express from 'express'
import { protect } from '../middlewares/auth.js'
import { textMsgController } from '../controllers/messagecontroller.js'
const messsageRouter = express.Router()

messsageRouter.post('/text',protect,textMsgController)

export default messsageRouter;