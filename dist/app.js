"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errors_1 = __importDefault(require("./middlewares/errors"));
const app = (0, express_1.default)();
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.json({ hello: "Hello World" });
});
app.use("/api", userRoute_1.default);
app.use(errors_1.default);
exports.default = app;
