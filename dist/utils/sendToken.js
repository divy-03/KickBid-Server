"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Changed to ES6 import
const sendToken = async (id, statusCode, res) => {
    const data = {
        user: {
            id,
        },
    };
    // Create JWT token
    const authToken = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME || "1d",
    });
    // Set cookie options
    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000),
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
exports.default = sendToken;
