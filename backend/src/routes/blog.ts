import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { hashpass , checkpass} from '../passwordhashing/hash';
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
      userId: string
    }
}>();


blogRouter.use('/*', async (c, next) => {
  //get the header and verify it

  const authHeader =  c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader,c.env.JWT_SECRET); 
  if(user){
    c.set("userId",user.id);
    await next();
  }
  } catch (error) {
    c.status(403);
    return c.json({message:"UnAuthorized"})
  }
})
  
  
  
blogRouter.post('/',async (c)=>{
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
  console.log("aya hu idr");
  try {
    const body = await c.req.json();
    const blog = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId: userId,
      }
    })
    c.status(200);
    return c.json({
      id:blog.id
    })
  } catch (error) {
    return c.status(403);
  }
})
  
blogRouter.put('/',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const blog = await prisma.post.update({
      where:{
        id:body.id
      },
      data:{
        title:body.title,
        content:body.content
      }
    })
    c.status(200);
    return c.json({
      id:blog.id
    })
  } catch (error) {
    return c.status(403);
  }

})
  
blogRouter.get('/:id',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id =  await c.req.param("id");
    const blog = await prisma.post.findFirst({
      where:{
        id
      }
    })
    c.status(200);
    return c.json({blog})
  } catch (error) {
    c.status(403);
    return c.json({
      message:"Error while fetching blog"
    })
  }
})
  
//pagination
blogRouter.get('/bulk',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();
    c.status(200);
    return c.json({blogs})
  } catch (error) {
    c.status(403);
    return c.json({
      message:"Error while fetching blogs"
    })
  }
})