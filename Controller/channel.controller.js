import channelModel from "../Model/channel.model.js";
import userModel from "../Model/user.model.js";

// Create Channel - (POST)
export const createChannel = async (req, res) => {
    if (!req.body.channelName) {
        return res.status(400).json({ success: false, message: "Channel name is required" });
    }
    if (!req.body.owner) {
        return res.status(400).json({ success: false, message: "Channel owner is required" });
    }
    if (!req.body.description) {
        return res.status(400).json({ success: false, message: "Channel description is required" });
    }
    if (!req.body.channelLogo) {
        return res.status(400).json({ success: false, message: "Channel logo is required" });
    }
    if (!req.body.channelBanner) {
        return res.status(400).json({ success: false, message: "Channel banner is required" });
    }

    const { channelName, owner, description, channelLogo, channelBanner } = req.body;

    try {
        const userMatch = await userModel.findOne({ _id: owner });
        const channelMatch = await channelModel.findOne({ channelName: channelName });

        if (channelMatch) {
            return res.status(400).json({ success: false, message: "Channel name already exist!" });
        }

        if (userMatch.channel.length >= 1) {
            return res.status(400).json({ success: false, message: "User can only use single channel with single email" });
        }
        const channel = await channelModel.create({ channelName, owner, description, channelLogo, channelBanner });

        userMatch.channel.push(channel._id);
        await userMatch.save();
        res.status(201).json({ success: true, message: "Channel Created Successfully", channel });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server Error" })
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
