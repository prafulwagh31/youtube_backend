import { addComment, deleteComment, getAllComments, getCommentId, updateComment } from "../Controller/comment.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

export function commentRoute(app){
    app.post("/youtube/addComment", addComment);
    app.get("/youtube/getAllComments", getAllComments);
    app.get("/youtube/getCommentId/:id", getCommentId);
    app.put("/youtube/updateComment/:id", updateComment);
    app.delete("/youtube/deleteComment/:id", deleteComment);
}