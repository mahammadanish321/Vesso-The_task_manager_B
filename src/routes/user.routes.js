import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/use.controllers.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(varifyJWT,logoutUser);

export default router;

