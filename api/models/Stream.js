const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  streamKey: String,
  rtmpUrl: String,
  isLive: { type: Boolean, default: false },
});

module.exports = mongoose.model("Stream", streamSchema);