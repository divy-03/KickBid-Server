"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRole = exports.fetchUser = void 0;
const resError_1 = __importDefault(require("../tools/resError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const fetchUser = async (req, res, next) => {
    const authToken = req.cookies.kToken;
    if (!authToken) {
        return (0, resError_1.default)(401, "Unauthorized", res);
    }
    try {
        const data = jsonwebtoken_1.default.verify(authToken, String(process.env.JWT_SECRET));
        const decodedData = data;
        const userId = decodedData.user.id;
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return (0, resError_1.default)(401, "Unauthorized", res);
        }
        req.user = user;
        next();
    }
    catch (error) {
        return (0, resError_1.default)(401, "Unauthorized", res);
    }
};
exports.fetchUser = fetchUser;
const authRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user?.role || !roles.includes(req.user.role)) {
            return (0, resError_1.default)(403, "You are not allowed to access this resource", res);
        }
        next();
    };
};
exports.authRole = authRole;
