import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { userRoute } from "./Routes/user.routes.js";
import { channelRoute } from "./Routes/channel.routes.js";
import { videoRoute } from "./Routes/video.routes.js";
import { commentRoute } from "./Routes/comment.routes.js";

let databaseName='YoutubeApp_db';
mongoose.connect(`mongodb+srv://prafulwagh31:Waghpraful31@@cluster0.wifyb.mongodb.net/`);

const app = new express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/youtubeapp_db')
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error:', err));
let db=mongoose.connection;
db.on('open',()=>{
  console.log(`MongoDB Connection is Successful`)
})
db.on('error',()=>{
  console.log(`MongoDB Connection isn't successful`)
})

// Routes Calling
userRoute(app);
channelRoute(app);
videoRoute(app);
commentRoute(app);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})