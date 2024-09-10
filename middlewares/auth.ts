import { NextFunction, Request, Response } from "express";
import resError from "../tools/resError";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const fetchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.kToken as string;

  if (!authToken) {
    return resError(401, "Unauthorized", res);
  }

  try {
    const data = jwt.verify(authToken, String(process.env.JWT_SECRET));
    const decodedData = data as JwtPayload;
    const userId = decodedData.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return resError(401, "Unauthorized", res);
    }

    req.user = user;
    next();
  } catch (error) {
    return resError(401, "Unauthorized", res);
  }
};

export const authRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return resError(403, "You are not allowed to access this resource", res);
    }
    next();
  };
};
