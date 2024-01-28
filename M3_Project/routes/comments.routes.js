const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Event = require("../models/Event.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

// GET all comments for an event
router.get("/events/:eventId/", isAuthenticated, async (req, res) => {
  try {
    console.log("Fetching comments for event:", req.params.eventId);
    const eventExists = await Event.exists({ _id: req.params.eventId });
    if (!eventExists) {
      return res.status(404).json({ message: "Event not found" });
    }
    const allComments = await Comment.find({ event: req.params.eventId }); //Updated parameter name
    console.log("Comments retrieved:", allComments);
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the Comments" });
  }
});

// GET comments from a specific user
router.get("/user/:userId", isAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  try {
    const comments = await Comment.find({ createdBy: userId });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}),
  //GET all the comments
  router.get("/", async (req, res) => {
    try {
      const commentList = await Comment.find();

      res.status(200).json(commentList);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
// GET ONE Comment by it's ID ON THE DETAIL PAGE
router.get("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST one comment
router.post("/:eventId", isAuthenticated, async (req, res) => {
  console.log("Received POST request for creating a comment");
  const payload = req.body;
  const eventId = req.params.eventId;
  const userId = req.tokenPayload.userId;
  payload.createdBy = userId;
  payload.eventId = eventId; // Add the eventId to the payload
  try {
    const createdComment = await Comment.create(payload);
    res.status(201).json(createdComment);
    console.log("Comment created successfully");
  } catch (error) {
    console.log("Error while creating a comment:", error);
    res.status(500).json({ message: "error while creating the Comment" });
  }
});
// UPDATE a comment
router.put("/:eventId/:commentId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { commentId } = req.params;
  try {
    const commentToUpdate = await Comment.findById(commentId);
    if (commentToUpdate && commentToUpdate.createdBy == userId) {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        payload,
        { new: true }
      );
      res.status(200).json(updatedComment);
    } else {
      res
        .status(401)
        .json({ message: "you are not the right user to update the comment" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the comment" });
  }
});

// DELETE a comment
router.delete("/:commentId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { commentId } = req.params;
  try {
    const commentToDelete = await Comment.findById(commentId);
    console.log(commentToDelete, userId);
    if (commentToDelete.createdBy == userId) {
      console.log("Deleting");
      await Comment.findByIdAndDelete(commentId);
      res.status(204).json();
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting the comment" });
  }
});

module.exports = router;
