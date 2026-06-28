const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// índice para busca
PostSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Post", PostSchema);