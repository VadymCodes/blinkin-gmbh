import userSchema from "../schema/user.schema";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//get all user details
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await userSchema.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

// Login function
export const logIn = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const isUser = await userSchema.findOne({ email });

    if (!isUser)
      return res.json({ error: { message: "User is not registered" } });

    if (isUser.password !== password)
      return res.json({ error: { message: "Invalid Password" } });

    const jwtToken = jwt.sign(
      { email: isUser.email, role: isUser.role },
      process.env.JWT_SECRET
    );

    res.json({ message: "Welcome Back", token: jwtToken, result: isUser });
  } catch (error) {
    console.log("something went wrong");
  }
};

///add user function
export const adduser = async (req: Request, res: Response) => {
  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const isUserSignIn = await userSchema.findOne({ email });

    if (isUserSignIn)
      return res.json({ error: { message: " User is already registered" } });

    const userData = await userSchema.create({ email, password, role });
    res.json(userData);
  } catch (error) {}
};
