import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './configs/db.js'
import userRouter from './routes/route.js'
import chatRouter from './routes/chatroutes.js'
import { textMsgController } from './controllers/messagecontroller.js'
import messsageRouter from './routes/messageroutes.js'
import creditRouter from './routes/creditrouter.js'
import { stripeWebhooks } from './controllers/webhooks.js'
dotenv.config()
connectDb()
const app = express()
app.use(express.json())
app.use(cors())


app.get('/',(req,res) => {
    res.json({"message":"server is running"})
})
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messsageRouter)
app.use('/api/credit',creditRouter)
app.use('/app/stripe',express.raw({type:'application/json'}),stripeWebhooks)
const port = process.env.PORT || 3000
app.listen(port,() => {
    console.log(`Server is running in ${port}`);
})