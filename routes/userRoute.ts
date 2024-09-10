import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router = Router();

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);

export default router;
