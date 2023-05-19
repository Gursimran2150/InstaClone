import express from "express";
import {
  followUser,
  unfollowUser,
} from "../../Controllers/follow Controller/FollowingController.js";
import {
  getFollowerByUserId,
  requestAccpet,
} from "../../Controllers/follow Controller/FollowRequestCont.js";
const router = express.Router();

router.post("/:id", followUser);
router.put("/confirm/:id", requestAccpet);
router.delete("/unfollow/:id", unfollowUser);
// router.get("/:postId", getLikes);
// router.put("/:id", likePost);
export default router;
