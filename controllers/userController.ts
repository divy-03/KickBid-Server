import { Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  // const { name, email, password } = req.body;

  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Server Error: ${error}`,
    });
  }
};
