const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
    },
    organiser: {
      type: String,
      required: [true, 'Author is required.'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Pages is required.'],
    },
    location: {
      type: String,
      required: [true, 'Pages is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Pages is required.'],
    },
    description: {
      type: String,
      required: [true, 'Pages is required.'],
    },
    image: {
      type: String,
      required: [true, 'Pages is required.'],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Book = model('Book', bookSchema)

module.exports = Book
