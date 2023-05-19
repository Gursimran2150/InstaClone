import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsOnPost,
  getCommentWithReply,
  likeOnComments,
  likesOnReplies,
  replyComment,
  replyComments2,
} from "../Controllers/CommentsController.js";
const router = express.Router();

// router.post("/", createComment);
// router.get("/:postId", getCommentsOnPost);

// router.post(`/:commentId/reply/:text`, replyComment);
// router.post(`/:commentId/reply`, replyComment);
// router.put("/:id", likePost);

// newwwwwwww router
router.post("/:postId", createComment);
router.get(`/:postId`, getCommentWithReply);
router.delete("/:commentId", deleteComment);

router.put(`/:commentId/reply`, replyComments2);
router.put(`/:commentId/like`, likeOnComments);

router.put(`/:commentId/repliesLike`, likesOnReplies);
export default router;
