import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import {taskCreate,taskComplete,taskDelete_bin,taskTotallyDelete,editTask} from "../controllers/task.controllers.js"



const router=Router();

router.route("/creat-task").post(varifyJWT,taskCreate)
router.route("/edit-task").patch(varifyJWT,editTask)
router.route("/task-complete").patch(varifyJWT,taskComplete)
router.route("/task-delete_bin").patch(varifyJWT,taskDelete_bin)
router.route("/totally-delete").delete(varifyJWT,taskTotallyDelete)

export default router;

