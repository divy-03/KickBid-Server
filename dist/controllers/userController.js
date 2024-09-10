"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_validator_1 = require("express-validator");
const resError_1 = __importDefault(require("../tools/resError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendToken_1 = __importDefault(require("../utils/sendToken"));
const resSuccess_1 = __importDefault(require("../tools/resSuccess"));
exports.registerUser = (0, catchAsyncError_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    // TODO: Cloudinary for avatar
    const salt = await bcryptjs_1.default.genSalt(10);
    const secPass = await bcryptjs_1.default.hash(password, salt);
    const user = await userModel_1.default.create({ name, email, password: secPass });
    return (0, sendToken_1.default)(user.id.toString(), 201, res);
});
exports.loginUser = (0, catchAsyncError_1.default)(async (req, res) => {
    const { email, password } = req.body;
    await (0, express_validator_1.check)("email", "Please enter a valid email").isEmail().run(req);
    await (0, express_validator_1.check)("password", "Please enter a password").notEmpty().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, resError_1.default)(400, errors.array(), res);
    }
    const user = await userModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        return (0, resError_1.default)(403, "Invalid email or password", res);
    }
    const savedPassword = user.password;
    const passwordCompare = await bcryptjs_1.default.compare(password, savedPassword);
    if (!passwordCompare) {
        return (0, resError_1.default)(401, "Password not matched", res);
    }
    return (0, sendToken_1.default)(user.id, 200, res);
});
exports.logoutUser = (0, catchAsyncError_1.default)(async (req, res) => {
    res.cookie("kToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    (0, resSuccess_1.default)(200, "Logged out", res);
});
exports.getUserProfile = (0, catchAsyncError_1.default)(async (req, res) => {
    const user = await userModel_1.default.findOne({ _id: req.user?._id });
    if (!user)
        return (0, resError_1.default)(404, "User not found", res);
    return res.status(200).json({
        success: true,
        user,
    });
});
