// Created model for user
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    channel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
    }]
}, { timestamps: true })

const userModel = mongoose.model("User", UserSchema);

export default userModel;