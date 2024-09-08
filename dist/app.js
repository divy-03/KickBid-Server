"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require("dotenv/config");
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173", // Replace with your client URL
    credentials: true,
}));
app.get("/", (req, res) => {
    res.json({ hello: "Hello World" });
});
exports.default = app;
