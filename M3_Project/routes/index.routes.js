const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

const eventsRouter = require("./events.routes");
router.use("/events", eventsRouter);

const commentsRouter = require("./comments.routes");
router.use("/:eventId/comments", commentsRouter);

const usersRouter = require("./users.routes");
router.use("/users", usersRouter);

module.exports = router;
