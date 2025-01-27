import { Router } from "express";
import { logInUser, registerUser } from "../controller/user.controller.js";

const router = Router()

router.route("/login").post(logInUser)
router.route("/register").post(registerUser)

export default router