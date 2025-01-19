import { addVideo, deleteVideo, getAllVideo, getVideoId, updateVideoDetails } from "../Controller/video.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

export function videoRoute(app){
    app.post("/youtube/addVideo", verifyToken, addVideo);
    app.get("/youtube/getAllVideo", getAllVideo);
    app.get("/youtube/getVideoId/:id", getVideoId);
    app.put("/youtube/updateVideoDetails/:id", verifyToken, updateVideoDetails);
    app.delete("/youtube/deleteVideo/:id", verifyToken, deleteVideo);
}