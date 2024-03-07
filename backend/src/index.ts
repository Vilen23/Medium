import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { hashpass , checkpass} from './passwordhashing/hash';
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  //get the header and verify it

  const header = c.req.header("authorization");
  const response  = await verify(header as string, c.env.JWT_SECRET);
  if(response.id){
    next();
  }else{
    c.status(403);
    return c.json({message:"Unauthorized"})
  } 
})

app.post('/api/v1/user/signup',async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const findmail = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(findmail){
      c.status(403);
      return c.json({message:"Email already in use"})
    }
    const pass = await hashpass(body.password)
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: pass,
        name:body.name
      }
    });

    const token  = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token})

  } catch (error) {
    return c.status(403)
  }
})

app.post('/api/v1/user/signin',async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(!user){
      c.status(403);
      return c.json({message:"Email is not linked to any account"})
    }
    const check = await checkpass(body.password,user.password);
    if(!check){
      c.status(403);
      return c.json({message:"Invalid password"})
    }
    const token  = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token})
  } catch (error) {
    return c.status(403)
  }
})

app.post('/api/v1/blog',(c)=>{
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog',(c)=>{
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk',(c)=>{
  return c.text('Hello Hono!')
})


export default app
