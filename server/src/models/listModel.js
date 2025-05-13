import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    position: {
        type: Number,
        required: true,
        default: 0
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

export default mongoose.model("List",listSchema);