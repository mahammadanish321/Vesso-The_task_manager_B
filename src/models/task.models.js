import mongoose,{ Schema } from "mongoose";


const taskSchema = new Schema(
    {
        taskName: {
            type: String,
            required: [true, "Task name is required"],
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        }
    },
    { timestamps: true }
);



export const Task = mongoose.model("Task",taskSchema);