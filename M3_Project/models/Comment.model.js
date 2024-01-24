const { Schema, model, Types } = require('mongoose')

const commentSchema = new Schema(
    {
      like: {
        type: Boolean,
      },
      description: {
        type: String,
        required: [true, 'Pages is required.'],
      },
      createdBy: {
        type: Types.ObjectId,
        ref: 'User',
      },
      event: {
        type: Types.ObjectId,
        ref: 'Event',
      }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  )

const Comment = model('Comment', commentSchema)

module.exports = Comment