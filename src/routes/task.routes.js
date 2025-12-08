import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import {taskCreate,taskComplete} from "../controllers/task.controllers.js"



const router=Router();

router.route("/creat-task").post(varifyJWT,taskCreate)
router.route("/task-complete").patch(varifyJWT,taskComplete)

export default router;

