import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
        required: true
    }
});

export default mongoose.model("Task",taskSchema);