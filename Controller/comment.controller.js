import commentModel from "../Model/comment.model.js";
import userModel from "../Model/user.model.js";
import videoModel from "../Model/video.model.js";
import mongoose from "mongoose";


// Add Comment - (POST)
export const addComment = async (req, res) => {
    const {description, userId, videoId} = req.body;
    try {
        const user = await userModel.findById(userId);
        const video = await videoModel.findById(videoId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        if (!video) {
            return res.status(400).json({ success: false, message: "No video to comment" })
        }

        const comment = await commentModel.create({ description, userId, videoId });

        video.comments.push(comment._id);
        await video.save();

        res.status(201).json({ success: true, message: "Comment added successfully", comment });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}


// Get All Comments - (GET)
export function getAllComments(req, res){
    commentModel.find().then((data) => {
        if(!data){
            res.status(404).send({success: false, message: "No Comment found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    });
}


// Get specific comment - (GET)
export function getCommentId(req, res){
    const id = req.params.id;
    commentModel.findById(id).then((data) => {
        if(!data){
            res.status(404).send({success: false, message: "Comment not found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    });
}

//Get single video comment - (GET)
export const getSingleVideoComments = async (req, res) => {
    try {
        const { id: videoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ success: false, message: "Invalid video ID" });
        }

        const video = await videoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        const commentIds = video.comments;
        if (!commentIds || commentIds.length === 0) {
            return res.status(404).json({ success: false, message: "No comments found for this video" });
        }

        const comments = await commentModel.find({ _id: { $in: commentIds } });

        res.status(200).json({ success: true, comments });
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ success: false, message: "Server error occurred", error: err.message });
    }
};



//Update Channel Details - (PUT)
export const updateComment = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedComment = await commentModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedComment){
            return res.status(404).send({success: false, message: 'Comment not update successfully' });
        }   
        res.status(200).send({success: true, message: "Comment update successfully", updatedComment});
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}

// Delete Channel using ObjectId - (DELETE)
export const deleteComment = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedComment = await commentModel.findByIdAndDelete(id);
        if(!deletedComment){
            return res.status(404).send({success: false, message: 'Comment not found' });
        }
        return res.status(200).send({success: true , message: "Comment Deleted Successfully", deletedComment});
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}
