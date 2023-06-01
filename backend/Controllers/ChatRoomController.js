import mongoose, { Schema } from "mongoose";
import chatRoomModel from "../Models/ChatRoomModel.js";
import messageModel from "../Models/MessageModel.js";
import UserModel from "../Models/UserModel.js";

// create room api controles
export const createRoom = async (req, res) => {
  console.log("Body Logged-:", req.body);

  // const sender = mongoose.Types.ObjectId(req.body.senderId);
  // const receiver = mongoose.Types.ObjectId(req.body.receiverId);

  try {
    const oldChat = await chatRoomModel.findOne({
      members: { $all: [req.body.senderId, req.body.recieverId] },
    });

    if (oldChat) {
      res.status(200).json(oldChat);
    } else {
      const newChat = new chatRoomModel({
        members: [req.body.senderId, req.body.recieverId],
      });
      const result = await newChat.save();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// find userRoom by userId api controles
export const userRooms = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.userId);

  try {
    const conversation = await chatRoomModel
      .find({
        members: { $in: [id] },
      })
      .populate("members");

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

// find room common b/w two user
export const findRoom = async (req, res) => {
  try {
    const senderId = mongoose.Types.ObjectId(req.params.firstId);
    const receiverId = mongoose.Types.ObjectId(req.params.secondId);

    console.log("senderId-: ", req.params.secondId);
    console.log("=============================");
    console.log("receiverId-:", receiverId);

    const chat = await chatRoomModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: "Chat room not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
