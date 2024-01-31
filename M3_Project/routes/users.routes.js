const User = require("../models/User.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

//get user by ID

router.get("/user/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong fetching a user" });
  }
});

//Get all the users (not sure if we need this one)
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the users" });
  }
});

module.exports = router;
