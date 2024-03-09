import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { hashpass , checkpass} from '../passwordhashing/hash';
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@vilen23/medium-zod';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
      userId: string
    }
}>();

//pagination
blogRouter.get('/bulk',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      orderBy:{
        createdAt:'desc'
      }
    });
    c.status(200);
    return c.json({blogs})
  } catch (error) {
    c.status(403);
    return c.json({
      message:"Error while fetching blogs"
    })
  }
})
blogRouter.get('/:id',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id =  c.req.param("id");
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

blogRouter.use('/*', async (c, next) => {
  //get the header and verify it
  try {
    const authHeader =  c.req.header("token") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);
    console.log(user);
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
  
  try {
    const author  = await prisma.user.findFirst({
      where:{
        id:userId
      }
    })
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Wrong format to create a blog post"
      })
    }
    let blog;
    try {
      blog = await prisma.post.create({
        data:{
          title:body.title,
          content:body.content,
          authorId: userId,
          imagelink:body.imagelink,
          authorName:author?.name || author?.email
        }
      })
    } catch (error) {
      console.error(error); // Log the error message
      c.status(500);
      return c.json({message: "Error creating blog post"});
    }
    console.log("after")
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

  try {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Wrong inputs to update the blog post"
      })
    }
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




  
