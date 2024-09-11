import { Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import User from "../models/userModel";
import {
  LoginUserRequestBody,
  MessageRespondBody,
} from "../types/reqBodyTypes";
import { check, validationResult } from "express-validator";
import resError from "../tools/resError";
import bcryptjs from "bcryptjs";
import sendToken from "../utils/sendToken";
import resSuccess from "../tools/resSuccess";

export const registerUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // TODO: Cloudinary for avatar

    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(password, salt);

    const user = await User.create({ name, email, password: secPass });
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

export const logoutUser = catchAsyncError(
  async (req: Request, res: Response<MessageRespondBody>) => {
    res.cookie("kToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    resSuccess(200, "Logged out", res);
  }
);

export const getUserProfile = catchAsyncError(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user?._id });

    if (!user) return resError(404, "User not found", res);

    return res.status(200).json({
      success: true,
      user,
    });
  }
);
