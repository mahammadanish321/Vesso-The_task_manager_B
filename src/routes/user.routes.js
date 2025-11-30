import { Router } from "express";
import { loginUser, registerUser } from "../controllers/use.controllers.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;




// import { Router } from "express";
// import multer from "multer";
// import { registerUser } from "../controllers/use.controllers.js";

// const router = Router();
// const upload = multer(); // memory storage default

// router.route("/register").post(upload.none(), registerUser);

// export default router;