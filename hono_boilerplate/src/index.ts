import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import {signupInput} from 'om74202_medium2'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    DIRECT_URL:string,
    JWT_SECRET:string
  }
}>()
app.use('/*',cors());



app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter)

export default app
