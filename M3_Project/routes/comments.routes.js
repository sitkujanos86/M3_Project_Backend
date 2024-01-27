const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

// GET all comments for an event
router.get("/events/:eventId", isAuthenticated, async (req, res) => {
  try {
    const allComments = await Comment.find({ eventId: req.params.eventId }); //Updated parameter name
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the Comments" });
  }
});

// GET ONE Comment ON THE DETAIL PAGE
//   router.get('/:bookId', async (req, res) => {
//     const { bookId } = req.params
//     try {
//       const oneBook = await Book.findById(bookId)
//       res.status(200).json(oneBook)
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({ message: 'error while getting the book' })
//     }
//   })

// POST one comment
router.post("/:eventId", isAuthenticated, async (req, res) => {
  console.log("Received POST request for creating a comment");
  const payload = req.body;
  const { userId } = req.tokenPayload;
  payload.createdBy = userId;
  payload.eventId = req.params.eventId; // Add the eventId to the payload
  try {
    const createdComment = await Comment.create(payload);
    res.status(201).json(createdComment);
    console.log("Comment created successfully");
  } catch (error) {
    console.log("Error while creating a comment:", error);
    res.status(500).json({ message: "error while creating the Comment" });
  }
});
// PUT one
router.put("/:eventId/:commentId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { commentId } = req.params;
  try {
    const commentToUpdate = await Comment.findById(commentId);
    if (commentToUpdate.createdBy == commentId && commentToUpdate) {
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

// DELETE one comment
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
