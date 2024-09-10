import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController";
import { fetchUser } from "../middlewares/auth";

const router = Router();

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(fetchUser, logoutUser);
router.route("/auth/profile").get(fetchUser, getUserProfile);

export default router;