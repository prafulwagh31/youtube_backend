// Created Video Model
import mongoose from "mongoose";

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],
    category: {
        type: String,
        required: true,
        enum: [
            "songs",
            "sports",
            "movies",
            "education",
            "business",
            "food",
            "finance",
            "gaming",
            "coding"
        ],
    },
}, { timestamps: true });


const videoModel = mongoose.model("Video", VideoSchema);

export default videoModel;