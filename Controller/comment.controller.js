import commentModel from "../Model/comment.model.js";


// Add Comment - (POST)
export function addComment(req, res){
    const {description, userId, videoId} = req.body;

    try{
        const newComment = new commentModel({
            description, 
            userId,
            videoId
        });
        newComment.save();
        res.status(201).send({
            success: true,
            message: "Comment added successfully",
            data: newComment
        });
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
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


// Get specific channel - (GET)
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
