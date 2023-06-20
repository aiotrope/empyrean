import { Schema, model } from 'mongoose'

const TodoSchema = new Schema(
  {
    items: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

TodoSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const Todo = model('Todo', TodoSchema)

export default Todo
