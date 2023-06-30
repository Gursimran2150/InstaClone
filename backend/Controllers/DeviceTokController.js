import deviceTokenModel from "../Models/DeviceToken.js";
import mongoose from "mongoose";

async function setDeviceToken(req, res) {
  const { userId, deviceToken } = req.body;
  try {
    let document = await deviceTokenModel.findOne({ userId });

    if (!document) {
      // If no document exists, create a new one and save it
      document = new deviceTokenModel({
        userId,
        deviceToken,
      });
    } else {
      // If a document exists, update the deviceToken field
      document.deviceToken = deviceToken;
    }

    await document.save();

    return res.json({
      userId: document.userId,
      deviceToken: document.deviceToken,
    });
  } catch (e) {
    return res.json({
      error: e.message,
    });
  }
}

export { setDeviceToken };
