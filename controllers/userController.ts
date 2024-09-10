import { Request, Response } from "express";
const catchAsyncError = require("../middlewares/catchAsyncError");
import User from "../models/userModel";
import { LoginUserRequestBody } from "../types/reqBodyTypes";
import { check, validationResult } from "express-validator";
import resError from "../tools/resError";
import bcryptjs from "bcryptjs";
import sendToken from "../utils/sendToken";

export const registerUser = catchAsyncError(
  async (req: Request, res: Response) => {
    // const { name, email, password } = req.body;

    const user = await User.create(req.body);
    return sendToken(user.id, 201, res);
  }
);

export const loginUser = catchAsyncError(
  async (req: Request<{}, {}, LoginUserRequestBody>, res: Response) => {
    const { email, password } = req.body;
    await check("email", "Please enter a valid email").isEmail().run(req);
    await check("password", "Please enter a password").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resError(400, errors.array(), res);
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return resError(403, "Invalid email or password", res);
    }
    const savedPassword = user.password;
    const passwordCompare = await bcryptjs.compare(password, savedPassword);

    if (!passwordCompare) {
      return resError(401, "Password not matched", res);
    }

    return sendToken(user.id, 200, res);
  }
);
