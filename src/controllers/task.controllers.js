import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const taskCreate = asyncHandler(async (req, res) => {
    const { taskName, description } = req.body;
    if (!taskName) {
        throw new ApiError(401, "plz enter the task name")
    }
    if (!description) {
        throw new ApiError(401, "description is requind place place enterd that")
    }
    const owner = req.user?._id;
    const task = await Task.create({
        taskName,
        description,
        owner: owner,
    })
    const createdTask = await Task.findById(task._id).select("-passwoed")
    if (!createdTask) {
        throw new ApiError(401, "During task creation have any problem")
    }
    return res
        .status(200)
        .json(
            new ApiResponce(200, createdTask, "task created successfully")
        )
})
const taskComplete = asyncHandler(async (req, res) => {
    const { taskId } = req.body
    // console.log(taskId);
    const task = await Task.findById(taskId);
    const updatedTaskCompleteOrNot = await Task.findByIdAndUpdate(taskId,
        {
            $set:
            {
                isCompleted: !task.isCompleted,
            }
        },
        { new: true }
    );
    if (!updatedTaskCompleteOrNot) {
        throw new ApiError(404, "Task not found");
    }
    return res
        .status(200)
        .json(
            new ApiResponce(200, updatedTaskCompleteOrNot, "toggol succecfully")
        )

})
const taskDelete_bin = asyncHandler(async (req, res) => {
    const { taskId } = req.body
    // console.log("=======>",taskId);
    const task = await Task.findById(taskId)
    if (!task) {
        throw new ApiError(404, "task now found")
    }
    const updatedTaskDeleteOrNot_moveToBin = await Task.findByIdAndUpdate(taskId,
        {
            $set:
            {
                isDeleted: !task.isDeleted,
            }
        }, { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponce(200, updatedTaskDeleteOrNot_moveToBin, "Task move to resycle Bin succsfully")
        )
})
const taskTotallyDelete = asyncHandler(async (req, res) => {
    const { taskId } = req.body
    const task = await Task.findById(taskId)
    if (!task) {
        throw new ApiError(404, "Task not found")
    }
    const DeletedTask = await Task.findByIdAndDelete(taskId)

    return res
        .status(200)
        .json(
            new ApiResponce(200, DeletedTask, "task dlt succesfully")
        )
})
const editTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body
    const taskExistOrNot = await Task.findById(taskId)
    if (!taskExistOrNot) {
        throw new ApiError(404, "the task on this id the not found")
    }
    // console.log("========>", taskId);
    const { taskName, description } = req.body
    // console.log("=======>", taskName, description);
    if (!taskName || !description || !taskId) {
        throw new ApiError(401, "something is missing hear")
    }
    const editedTask = await Task.findByIdAndUpdate(taskId,
        {
            $set: {
                taskName: taskName,
                description: description,
            }
        }, { new: true }
    )
    return res
        .status(200)
        .json(
            new ApiResponce(200, editedTask, "the update succesfully")
        )
})
//databace call match with owner
//write a pipeline add the all fildes which have same owner and send the result to JSON 
const showAllTask = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        return res
            .status(401)
            .json(new ApiResponce(401, null, "User not authenticated"));
    }

    const tasks = await Task.find({
        owner: userId,
        isDeleted: false,      // remove this filter if you want deleted also
    })
        .sort({ createdAt: -1 })  // latest first
        .populate("owner", "username email"); // optional: get user details

    return res
        .status(200)
        .json(
            new ApiResponce(
                200,
                { tasks },
                "Your all tasks fetched successfully"
            )
        );
});
export { taskCreate, taskComplete, taskDelete_bin, taskTotallyDelete, editTask,showAllTask };