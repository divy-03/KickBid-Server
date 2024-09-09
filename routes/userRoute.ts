import { Router } from "express";
import { registerUser } from "../controllers/userController";

const router = Router();

router.route("/auth/register").post(registerUser);

export default router;
