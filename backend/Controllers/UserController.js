import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { constents } from "../Constents.js";
import mongoose from "mongoose";
import blockUserModel from "../Models/BlockListModel.js";
import path from "path";
import { error } from "console";


// *******************************************
export const currentUser = async (req, res) => {
  const token = req.headers.authorization;
  console.log("token->", process.env.JWTKEY);

  const decoded = jwt.verify(token, process.env.JWTKEY);
  console.log("decoded-->", decoded);

  const currentUserId = decoded.id;

  try {
    const data = await userModel.findById(currentUserId);
    data.length === 0
      ? res.send(constents.RESPONES.NO_DATA("No data"))
      : res.send(constents.RESPONES.SUCCESS({ data }, "successfully get user"));
  } catch (error) {
    res.send(constents.RESPONES.ERROR(error));
  }
};

/********************************************
 ********** API for get all user ***********/
export const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.send(
      constents.RESPONES.SUCCESS(
        { users },
        constents.RESPONES.USER_MESSAGE.ALL_USER
      )
    );
  } catch (error) {
    res.send(constents.RESPONES.ERROR(error));
  }
};

/********************************************
 *** API for search user by given char  *****/
export const getUserByNameStart = async function (req, res) {
  const { char } = req.params;
  try {
    //get block list of current user
    let blockList = await blockUserModel.findOne({ userId: currentUserId });

    // get user
    let user = await userModel.find({
      firstName: { $regex: `^${char}` },
      _id: { $nin: blockList.blockedUsers },
    });

    if (user) {
      res.send(
        constents.RESPONES.SUCCESS(
          user,
          constents.RESPONES.USER_MESSAGE.ALL_USER
        )
      );
    } else {
      res.send(constents.RESPONES.NO_DATA());
    }
  } catch (error) {
    res.send(constents.RESPONES.ERROR());
  }
};

/********************************************
 ***** API for GET user by name pattern  ****/
export const getUserByNamePattern = async function (req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWTKEY);
  // const currentUserId = decoded.id;

  const { pattern } = req.params;
  try {
    //get block list of current user
    // let blockList = await blockUserModel.findOne({ userId: currentUserId });
    //let followfollowings = await
    // get user

    let user = await userModel.find({
      firstName: { $regex: `${pattern}` },
    });
    if (user) {
    }
    user.length === 0
      ? res.send(constents.RESPONES.NO_DATA("No data"))
      : res.send(constents.RESPONES.SUCCESS(user, "successfully get all user"));
  } catch (error) {
    console.log(error);
    res.send(constents.RESPONES.ERROR());
  }
};

/*********************************************
 ** API for GET user by name end with char **/
export const getUserByNameEnd = async function (req, res) {
  const { char } = req.params;
  try {
    //get block list of current user
    let blockList = await blockUserModel.findOne({ userId: currentUserId });

    // get user
    let user = await userModel.find({
      firstName: { $regex: `${char}$` },
      _id: { $nin: blockList.blockedUsers },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No Such User name end with this char");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/********************************************
 ******* API for get user by userName *******/
export const getUserByUserName = async (req, res) => {
  const { pattern } = req.params;
  try {
    //get block list of current user
    let blockList = await blockUserModel.findOne({ userId: currentUserId });

    // get user
    let user = await userModel.find({
      firstName: { $regex: `${pattern}` },
      _id: { $nin: blockList.blockedUsers },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No Such User with this userName");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/********************************************
 ******* API for update user details ********/
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserAdmin, password } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWTKEY);
  const userId = decoded.id;

  if (id === userId) {
    try {

      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
       
      }

      
      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "24h" }
      );
 
      res.send(
        constents.RESPONES.SUCCESS(
          { user, token },
          constents.RESPONES.USER_MESSAGE.USER_UPDATE
        )
      );
    } catch (error) {
      res.send(constents.RESPONES.ERROR());
    }
  } else {
    
    res.send(constents.RESPONES.ACCESS_DENIED());
  }
};

/********************************************
 *********** API for delete user ************/
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await userModel.findByIdAndDelete(id);
      res.send(
        constents.RESPONES.SUCCESS(
          "",
          constents.RESPONES.USER_MESSAGE.USER_DELETE
        )
      );
      // res
      // 	.status(200)
      // 	.json({ success: true, message: "User Deleted Successfully!" });
    } catch (error) {
      // res.status(500).json(err);
      res.send(constents.RESPONES.ERROR(error));
    }
  } else {
    // res.status(403).json({ success: false, message: "Access Denied!" });
    res.send(constents.RESPONES.INVALID_USERNAME_PASSWORD());
  }
};

/********************************************
 ***** API for get user with all data *******/
export const getUser = async (req, res) => {


  const userId = req.params.id;
  console.log("userId==>", userId);
  try{
     const data = await userModel.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(userId) },
        },

        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "userId",
            as: "posts",
          },
        },
        {
          $lookup: {
            from: "followers",
            localField: "_id",
            foreignField: "userId",
            as: "followData",
          },
        },
        {
          $unwind: {
            path: "$followData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            role: 1,
            visibility: 1,
            status: 1,
            dateOfBirth: 1,
            userName: 1,
            profileImage: 1 ,
            posts: {
              media: {
                thumbnail: 1,
              },
            },
            followData: 1,
          },
        },
      ]);
      res.send(constents.RESPONES.SUCCESS(data[0]));
    
  } catch (error) {
    console.log("error from get user by id api", error);
    res.send(constents.RESPONES.ERROR(error));
  }
};


// ***** API for uploading user profile Image *******

export const uploadProfilePic = async (req, res) => {
  const userId = req.params.userId;
  const { profileUrl } = req.body;
  try {

    const updatedUser = await userModel.findByIdAndUpdate(
      userId, 
      { profileImage:profileUrl },
      { new: true }
    );

    console.log("Updated User-:", updateUser)
    console.log("Profile Image-:",profileUrl)

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile URL updated successfully' });

  } catch (err) { 
    res.json(
      {
        message: "failed",
        err:error.message
      }
    )
  }
};






