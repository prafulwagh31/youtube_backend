import channelModel from "../Model/channel.model.js";

// Create Channel - (POST)
export function createChannel(req, res){
    const {channelName, owner, description, channelLogo, channelBanner} = req.body;

    try{
        const newChannel = new channelModel({
            channelName, 
            owner,
            description, 
            channelLogo, 
            channelBanner
        });
        newChannel.save();
        res.status(201).send({
            success: true,
            message: "Channel created successfully",
            data: newChannel
        });
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}

// Get All Channel - (GET)
export function getAllChannel(req, res){
    channelModel.find().then((data) => {
        if(!data){
            res.status(404).send({success: false, message: "No Channel found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    });
}


// Get specific channel - (GET)
export function getChannelId(req, res){
    const id = req.params.id;
    channelModel.findById(id).then((data) => {
        if(!data){
            res.status(404).send({success: false, message: "Channel not found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    });
}


//Update Channel Details - (PUT)
export const updateChannelDetails = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedChannel = await channelModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedChannel){
            return res.status(404).send({success: false, message: 'Channel not update successfully' });
        }   
        res.status(200).send({success: true, message: "Channel update successfully", updatedChannel});
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}

// Delete Channel using ObjectId - (DELETE)
export const deleteChannel = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedChannel = await channelModel.findByIdAndDelete(id);
        if(!deletedChannel){
            return res.status(404).send({success: false, message: 'Channel not found' });
        }
        return res.status(200).send({success: true , message: "Channel Deleted Successfully", channelDeleted: deletedChannel});
    }
    catch(err){
        res.status(500).send({success: false, message: "Server Error", error: err.message});
    }
}
