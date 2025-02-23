import videoModel from "../Model/video.model.js";
import mongoose from "mongoose";

// Add Video - (POST)
export const addVideo = async (req, res) => {
    const { title, description, thumbnailUrl, videoUrl, owner, channelId, category} = req.body;

    try{
        const newVideo = new videoModel({
            title, description, thumbnailUrl, videoUrl, owner, channelId, category
        });
        newVideo.save();
        res.status(201).send({
            success: true,
            message: "Video Added successfully",
            data: newVideo
        });
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}

// Get All Videos - (GET)
export function getAllVideo(req, res){
    videoModel.find().then((data) => {
        if(!data){
            res.status(404).send({success: false, message: "No Videos found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    });
}

// Get specific video - (GET)
export function getVideoId(req, res){
    const id = req.params.id;
    videoModel.findById(id).then((data) => {
        if(!data){
            res.status(404).send({success: false, message: "Video not found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    });
}

export const getChannelVideos = async (req, res) => {
    try {
        const { id: channelId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ success: false, message: "Invalid channel ID" });
        }
        const videos = await videoModel.find({ channelId: new mongoose.Types.ObjectId(channelId) });
        if (!videos || videos.length === 0) {
            return res.status(404).json({ success: false, message: "No videos found for this channel" });
        }

        res.status(200).json({ success: true, videos });
    } catch (err) {
        console.error("Error fetching channel videos:", err); // Log full error
        res.status(500).json({ success: false, message: "Server error occurred", error: err.message });
    }
};


// Update Video Details - (PUT)
export const updateVideoDetails = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedVideo = await videoModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedVideo){
            return res.status(404).send({success: false, message: 'Video not update successfully' });
        }   
        res.status(200).send({success: true, message: "Video update successfully", updatedVideo});
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}

// Delete Video using ObjectId - (DELETE)
export const deleteVideo = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedVideo = await videoModel.findByIdAndDelete(id);
        if(!deletedVideo){
            return res.status(404).send({success: false, message: 'Video not found' });
        }
        return res.status(200).send({success: true , message: "Video Deleted Successfully", videoDeleted: deletedVideo});
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}

// Search Video - (GET)
export const searchVideo = async (req, res) => {
    const { searchVideo } = req.params;
    try {
        const result = await videoModel.find({
            title: { $regex: searchVideo, $options: "i" }
        });
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "No video matched your search" });
        }
        res.status(200).json({ success: true, videos: result })
    } catch (err) {
        res.status(500).json({ success: false, message: "server error occured" });
    }
}