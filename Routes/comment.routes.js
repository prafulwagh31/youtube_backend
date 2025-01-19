import { addComment, deleteComment, getAllComments, getCommentId, updateComment } from "../Controller/comment.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

export function commentRoute(app){
    app.post("/youtube/addComment", verifyToken, addComment);
    app.get("/youtube/getAllComments", verifyToken, getAllComments);
    app.get("/youtube/getCommentId/:id", verifyToken, getCommentId);
    app.put("/youtube/updateComment/:id", verifyToken, updateComment);
    app.delete("/youtube/deleteComment/:id", verifyToken, deleteComment);
}