import { addVideo, deleteVideo, getAllVideo, getChannelVideos, getVideoId, searchVideo, updateVideoDetails } from "../Controller/video.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

export function videoRoute(app){
    app.post("/youtube/addVideo", verifyToken, addVideo);
    app.get("/youtube/getAllVideo", getAllVideo);
    app.get("/youtube/getVideoId/:id", getVideoId);
    app.get("/youtube/getChannelVideos/:id", getChannelVideos);
    app.get("/youtube/search/:searchVideo", searchVideo)
    app.put("/youtube/updateVideoDetails/:id", verifyToken, updateVideoDetails);
    app.delete("/youtube/deleteVideo/:id", verifyToken, deleteVideo);
}