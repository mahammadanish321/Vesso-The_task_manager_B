import { Task } from "../models/task.models.js";
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


//take the bollean value from the request
//if its true the mark the task as complete if not the then leave at its defult from
//sent the responce
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

if (!updatedTaskCompleteOrNot) throw new ApiError(404, "Task not found");



return res
    .status(200)
    .json(
        new ApiResponce(200, updatedTaskCompleteOrNot, "toggol succecfully")
    )

})

// const updated = await Task.findByIdAndUpdate(
//   taskId,
//   { $bit: { isCompleted: { xor: 1 } } },
//   { new: true }
// );
// if (!updated) throw new ApiError(404, "Task not found");

// return res
// .status(200)
// .json(new ApiResponce(200, { isCompleted: updated.isCompleted }, "Toggled successfully"));

export { taskCreate, taskComplete };