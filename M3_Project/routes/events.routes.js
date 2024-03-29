const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Event = require("../models/Event.model");

// GET all events
router.get("/", async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the events" });
  }
});

// GET ONE EVENT ON THE DETAIL PAGE
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const oneEvent = await Event.findById(eventId);
    res.status(200).json(oneEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the event" });
  }
});




//get all events of one user
router.get('/createdBy/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find events with the specified userId
    const events = await Event.find({ createdBy: userId });

    // Check if events were found
    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found for the specified user.' });
    }

    // Return the found events
    res.status(200).json(events);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// POST one event
router.post("/", isAuthenticated, async (req, res) => {
  const payload = req.body;
  const { userId } = req.tokenPayload;
  payload.createdBy = userId;
  try {
    const createdEvent = await Event.create(payload);
    res.status(201).json(createdEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the event" });
  }
});
// EDIT an event
router.put("/:eventId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { eventId } = req.params;
  try {
    const eventToUpdate = await Event.findById(eventId);
    if (eventToUpdate.createdBy == userId) {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, payload, {
        new: true,
      });
      res.status(200).json(updatedEvent);
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the event" });
  }
});

// DELETE an event
router.delete("/:eventId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { eventId } = req.params;
  console.log("user", userId, "event", eventId);
  try {
    const eventToDelete = await Event.findById(eventId);
    console.log(eventToDelete, userId);
    if (eventToDelete.createdBy.equals(userId)) {
      console.log("Deleting");
      await Event.findByIdAndDelete(eventId);
      res.status(204).json({ message: "Event deleted succeffully!" });
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting the event" });
  }
});

// GET event details with comments
router.get("/:eventId/details", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const comments = await Comment.find({ eventId });

    const eventData = {
      title: event.title,
      description: event.description,
      createdBy: event.createdBy,
      // We can add the other properties as well here
      comments,
    };

    res.status(200).json(eventData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while fetching event details" });
  }
});

module.exports = router;
