"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        validate: [validator_1.default.isEmail],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["player", "admin", "captain"],
        default: "player",
    },
    avatar: {
        public_id: String,
        url: String,
    },
    position: {
        type: String,
        enum: [
            "LW",
            "RW",
            "CAM",
            "ST",
            "CF",
            "CM",
            "CDM",
            "LM",
            "RM",
            "LB",
            "RB",
            "CB",
            "LWB",
            "RWB",
            "GK",
        ],
    },
    rating: {
        type: Number,
        default: 0,
    },
    // tid: {
    //   type: Types.ObjectId,
    //   ref: "Team"
    // },
    resetPasswordToken: {
        type: String,
        default: undefined,
    },
    resetPasswordExpire: {
        type: Date,
        default: undefined,
    },
});
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
