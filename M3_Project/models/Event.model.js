const { Schema, model, Types } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    organiser: {
      type: String,
      required: [true, "Author is required."],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Pages is required."],
    },
    location: {
      type: String,
      required: [true, "Pages is required."],
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      required: [true, "Pages is required."],
    },
    image: {
      type: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
