import { createChannel, deleteChannel, getAllChannel, getChannelId, updateChannelDetails } from "../Controller/channel.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

export function channelRoute(app){
    app.post("/youtube/createChannel", verifyToken ,createChannel);
    app.get("/youtube/getAllChannel", getAllChannel);
    app.get("/youtube/getChannelId/:id", getChannelId);
    app.put("/youtube/updateChannelDetails/:id", verifyToken, updateChannelDetails);
    app.delete("/youtube/deleteChannel/:id", verifyToken, deleteChannel);
}