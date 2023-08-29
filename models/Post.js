import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // ссылвется по этому id
      ref: 'User', // будет ссылаться на модель юзер, будет ссылаться по id и достает пользователя
      required : true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Post', PostSchema)
