// Created Channel Model
import mongoose from "mongoose"

const CommentSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Video"
    },
}, { timestamps: true })

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;