import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import { loginUser, logoutUser, registerUser,getUser } from "../controllers/use.controllers.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(varifyJWT,logoutUser);
router.route("/get-username").get(varifyJWT,getUser);

export default router;

