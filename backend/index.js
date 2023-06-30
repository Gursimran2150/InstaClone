import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fileUpload from "express-fileupload";
import authMiddleWare from "./Middleware/AuthMiddleware.js";
dotenv.config();
import authRoute from "./Routes/AuthRoute.js";
import postRoute from "./Routes/PostRoute.js";
import userRoute from "./Routes/UserRoute.js";
import uploadRoute from "./Routes/UploadRoute.js";
import messageRoute from "./Routes/MessageRoute.js";
import chatRoomRoute from "./Routes/ChatRoomRoute.js";
import groupChatRoute from "./Routes/GroupChatRoute.js";
import likeRoute from "./Routes/likesRoute.js";
import commentRoute from "./Routes/CommentRoute.js";
import followRoute from "./Routes/followRoutes/RequestRoute.js";
import blockUserRoute from "./Routes/UserBlockRoute.js";
import storyRoute from "./Routes/StoryRoute.js";
import deviceTokenRouter from "./Routes/DeviceTokenRoute.js";
import path from "path";
const app = express();
const hostName = "192.168.1.2";

// mongoose connect and then call server
mongoose
  .connect(process.env.DATABASE || dev_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.SERVER_PORT, hostName, () => {
      console.log(
        `Listening at Port ${process.env.SERVER_PORT} and host ${hostName}`
      );
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

//view engines setup
app.set("view engine", "ejs");
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json({ limit: "250mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "250mb", extended: true }));
app.use(express.static("./public"));
app.use(express.static("./uploads/files"));
app.use(express.static("./uploads/images"));
app.use(express.static("./uploads"));
app.use(express.static("./uploads/videos"));
app.use(express.static("./public/uploads/files"));
app.use(express.static("./public/uploads/images"));
app.use(express.static("./public/uploads/videos"));
app.use("/accounts", authRoute);
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/stories", storyRoute);
app.use("/upload", uploadRoute);
app.use("/message", messageRoute);
app.use("/chatRoom", chatRoomRoute);
app.use("/groupChat", groupChatRoute);
app.use("/likePost", authMiddleWare, likeRoute);
app.use("/comment", commentRoute);
app.use("/follow", followRoute);
app.use("/block", blockUserRoute);
app.use("/notification", deviceTokenRouter);
