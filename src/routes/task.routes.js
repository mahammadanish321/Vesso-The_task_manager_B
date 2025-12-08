import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import {taskCreate,taskComplete,taskDelete_bin} from "../controllers/task.controllers.js"



const router=Router();

router.route("/creat-task").post(varifyJWT,taskCreate)
router.route("/task-complete").patch(varifyJWT,taskComplete)
router.route("/task-delete_bin").patch(varifyJWT,taskDelete_bin)

export default router;

