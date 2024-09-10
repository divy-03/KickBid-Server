import express from "express";
import { Request, Response } from "express"; // Keep this named import if needed
import cors from "cors";
import errorMid from "./middlewares/errors";
const app = express();
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ hello: "Hello World" });
});

app.use("/api", userRoute);

app.use(errorMid);

export default app;
