import express from "express";
import { Request, Response } from "express";  // Keep this named import if needed

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
