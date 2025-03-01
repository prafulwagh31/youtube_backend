import { addComment, deleteComment, getAllComments, getCommentId, getSingleVideoComments, updateComment } from "../Controller/comment.controller.js";

export function commentRoute(app){
    app.post("/youtube/addComment", addComment);
    app.get("/youtube/getAllComments", getAllComments);
    app.get("/youtube/getCommentId/:id", getCommentId);
    app.get("/youtube/singleVideoComment/:id", getSingleVideoComments);
    app.put("/youtube/updateComment/:id", updateComment);
    app.delete("/youtube/deleteComment/:id", deleteComment);
}