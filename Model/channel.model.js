// Created Channel Models
import mongoose from "mongoose";

const ChannelSchema = mongoose.Schema({
    channelName: {
        required: true,
        type: String,
        unique: true,
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    channelLogo: {
        type: String,
        required: true,
    },
    channelBanner: {
        type: String,
        required: true,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
}, { timestamps: true });

const channelModel = mongoose.model("Channel", ChannelSchema);

export default channelModel;