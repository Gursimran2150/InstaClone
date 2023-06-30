import chatRoomModel from "../Models/ChatRoomModel.js";
import deviceTokenModel from "../Models/DeviceToken.js";
import messageModel from "../Models/MessageModel.js";
import axios from 'axios'
import UserModel from "../Models/UserModel.js";


// add message using roomId ,senderId ,text
export const addMessage = async (req, res) => {
  const { roomId, senderId, text } = req.body;
  const message = new messageModel({
    roomId,
    senderId,
    text,
  });
  try {
    
    const result = await message.save();
    
    const chatRoom = await chatRoomModel.findById(roomId);
    const senderDetails = await UserModel.findById(senderId);
    const senderName = `${senderDetails.firstName} ${senderDetails.lastName}`
    // console.log('Chat Room', chatRoom)
    if(chatRoom){
      const userId = chatRoom.members.find((id) => id !== senderId);
      console.log("===========================")
      console.log('Receiver Id:', userId);
      console.log("===========================")
      const deviceUserModel = await deviceTokenModel.findOne({ userId })
      console.log("deviceUserModel-:",deviceUserModel)
      if (deviceUserModel) {
        const deviceToken = deviceUserModel.deviceToken;
        console.log('DeviceToken-:', deviceToken)
        sendNotification(deviceToken, senderName, text);
      } else { 
        console.log(`Notifications are off for this user-: ${userId} `);
      }
  }



   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get message using chat/room id
export const getMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const result = await messageModel.find({ roomId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};



//sending notifications
const sendNotification = async (deviceToken, title, body) => {
  const serverKey = 'AAAAemRiUoQ:APA91bEumjNTVCRAWzkCeqj5nMElMocNjmNgMeFDJ2z1nu-d9vlKmTx4tA2BOtKmmh9J10_SftUK0720j1NTR2-zFlL9u-BVaNOxgnwcbTDImeKE1MyrMihbdozq17LQnt7UbTKg9Hko'; // Replace with your FCM server key
  const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `key=${serverKey}`,
  };

  const notification = {
    to: deviceToken,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    const response = await axios.post(fcmEndpoint, notification, {
      headers: headers,
    });

    console.log('FCM notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending FCM notification:', error);
  }
};