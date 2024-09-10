"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const atlas_1 = require("./atlas");
const PORT = process.env.PORT || 4000;
(async () => {
    try {
        await (0, atlas_1.connectToAtlas)(); // Wait for the connection to be established
        app_1.default.listen(process.env.PORT, () => {
            console.log(`Server is working on http://localhost:${process.env.PORT}`);
        });
    }
    catch (err) {
        console.error("Failed to connect to MongoDB Atlas:", err);
    }
})();
