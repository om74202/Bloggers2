import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export const blogRouter= new Hono<{
  Bindings:{
    DATABASE_URL:string,
    DIRECT_URL:string,
    JWT_SECRET:string
  },
  Variables:{
    userId:string,
  }
}>()

blogRouter.use("/*",async (c,next)=>{
    const authHeader=c.req.header("authorization") || "";
    const user=await verify(authHeader,c.env.JWT_SECRET)
    if(user){
        c.set("userId",user.id as string);
        await next();
    }else{
        c.status(403);
        return c.json({
            message:"you are not logged in"
        })
    }
})

blogRouter.post('/',async (c)=>{
    const body=await c.req.json()
    const authorId=c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const blog=await prisma.blog.create({
        data:{
            content:body.content,
            title:body.title,
            authorId:authorId
        }
    })
    
    return c.json({
        id:blog.id
    })
}catch(e){
    console.log(e);
    return c.json({
        message:"error occored"
    })
}


})


blogRouter.put('/',async (c)=>{
    const body=await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const blog=await prisma.blog.update({
    where:{
        id:body.id
    },
    data:{
        content:body.content,
        title:body.title
    }
})

return c.json({
    id:blog.id
})
})


blogRouter.get('/bulk',async (c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const blogs=await prisma.blog.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });

        return c.json({
            blogs:blogs
        })
    }catch(e){
        return c.json({
            message:"some error occured"
        })
    }
})


blogRouter.get('/:id',async (c)=>{
    const id= c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const blog=await prisma.blog.findFirst({
        where:{
            id:id
        },
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })    

    return c.json({
        blog
    })

}catch(e){
    c.status(411);
    return c.text("some error occured ")
}
})


