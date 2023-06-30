import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUser,
	getUserByNameEnd,
	getUserByNamePattern,
	getUserByNameStart,
	updateUser,
	// followUser,
	// unfollowUser,
	getUserByUserName,
	currentUser,
	uploadProfilePic,
} from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/AuthMiddleware.js";
import fileUpload from "express-fileupload";

const router = express.Router();
router.use(fileUpload())
router.get("/", getAllUsers);
// router.get("/", getttalll);
router.get("/currentUser",currentUser)


// router.get("/:id", getUser);
router.get("/:id", getUser);

router.put("/:id", authMiddleWare,updateUser);
router.delete("/:id", authMiddleWare,deleteUser);

//search api for user by userName
router.get("/search-by-userName/:userName", getUserByUserName);

// Search apis for user First Name
router.get("/search-by-name-pattern/:pattern", getUserByNamePattern);
router.get("/search-name-start-with/:char", getUserByNameStart);
router.get("/search-name-end-with/:char", getUserByNameEnd);







//uploading profile pic
router.put("/users/:userId/profile-picture", uploadProfilePic);



export default router;
