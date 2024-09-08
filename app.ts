import express from "express";
import { Request, Response } from "express"; // Keep this named import if needed
import cors from "cors";
const app = express();
import "dotenv/config";

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173", // Replace with your client URL
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ hello: "Hello World" });
});

export default app;
