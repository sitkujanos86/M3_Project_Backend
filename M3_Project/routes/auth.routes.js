const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/route-guard.middleware");
router.get("/", (req, res) => {
  res.json("All good in auth");
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const potentialUser = await User.findOne({ email });
    if (!potentialUser) {
      const salt = bcrypt.genSaltSync(13);
      const hashedPassword = bcrypt.hashSync(password, salt);
      try {
        await User.create({ username, email, hashedPassword });
        res.status(201).json({ message: "User created" });
      } catch (error) {
        res.status(500).json({ message: "Problem with creating user" });
      }
    } else {
      res.status(400).json({ message: "The email is already in use" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There was an error while trying to get a user" });
  }
});

//LOGIN
// ASK TA WHY ID IS WITH "_id"
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const potentialUser = await User.findOne({ email });

    if (potentialUser) {
      const passwordCorrect = bcrypt.compareSync(
        password,
        potentialUser.hashedPassword
      );
      if (passwordCorrect) {
        const authToken = jwt.sign(
          { userId: potentialUser._id },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );
        res.status(200).json({ token: authToken });
      } else {
        // Incorrect password
        console.log("Problem with password");
        res.status(403).json({ message: "Something went wrong" });
      }
    } else {
      // No user with this email
      console.log("Problem while checking for the email");
      res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/verify", isAuthenticated, async (req, res) => {
  console.log(req.tokenPayload);
  const currentUser = await User.findById(req.tokenPayload.userId);
  res.status(200).json(currentUser);
});

module.exports = router;
