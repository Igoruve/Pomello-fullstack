import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    start: {
        type: Date,
        timezone: "UTC",
        required: true,
        default: Date.now
    },
    end: {
        type: Date,
        timezone: "UTC",
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }
});