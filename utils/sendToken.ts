import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken"; // Changed to ES6 import

const sendToken = async (id: string, statusCode: number, res: Response) => {
  const data = {
    user: {
      id,
    },
  };

  // Create JWT token
  const authToken = jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE_TIME || "1d",
  });

  // Set cookie options
  const options: CookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure secure is true if in production
    sameSite: "none", // Set as "none" (lowercase) for cross-origin requests
  };
  
  
  // Set the cookie with the JWT token
  res.cookie("kToken", authToken, options);
  

  // Return the response
  return res.status(statusCode).json({
    success: true,
    authToken,
  });
};

export default sendToken;
