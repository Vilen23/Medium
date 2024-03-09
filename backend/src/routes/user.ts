import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashpass, checkpass } from "../passwordhashing/hash";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@vilen23/medium-zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/check", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const token = c.req.header("token") || "";
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.status(200);
      return c.json({ user });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Invalid token" });
  }
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  //sanitizing the input
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs",
    });
  }
  try {
    const findmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (findmail) {
      c.status(403);
      return c.json({ message: "Email already in use" });
    }

    const pass = await hashpass(body.password);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: pass,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  //sanitizing
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "Email is not linked to any account" });
    }

    const check = await checkpass(body.password, user.password);
    if (!check) {
      c.status(403);
      return c.json({ message: "Invalid password" });
    }
    const { password, ...userdata } = user;
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      token,
      user: userdata,
    });
  } catch (error) {
    return c.status(403);
  }
});

userRouter.get("/getuser/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorid = c.req.param("id");
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: authorid,
      },
    });
    if (!user) {
      c.status(411);
      return c.json({
        message: "User does not exist anymore",
      });
    }
    c.status(200);
    return c.json({
      name: user.name,
    });
  } catch (error) {
    c.status(500);
    return c.json("Internal server error");
  }
});
