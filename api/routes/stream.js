const express = require("express");
const Stream = require("../models/Stream");
const auth = require("../middleware/authMiddleware");
const { getStreamConfig } = require("../config/streamProvider");

const router = express.Router();

// ✅ Create Stream
router.post("/create", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    // 🔥 Get config from provider (VideoSDK)
    const config = await getStreamConfig();

    if (!config) {
      return res.status(500).json({ msg: "Streaming provider error" });
    }

    // ✅ Save in DB
    const stream = await Stream.create({
      userId: req.user.id,
      title,
      streamKey: config.streamKey,
      rtmpUrl: config.rtmpUrl,
      playbackUrl: config.playbackUrl, // 🔥 store this for future use
      isLive: false, // 🔥 future feature
      createdAt: new Date(),
    });

    // ✅ Send response
    res.json({
      success: true,
      stream,
      obs: {
        server: config.rtmpUrl,
        key: config.streamKey,
      },
      playbackUrl: config.playbackUrl,
    });

  } catch (error) {
    console.error("STREAM CREATE ERROR:", error.message);

    res.status(500).json({
      success: false,
      msg: "Stream creation failed",
      error: error.message, // 🔥 helps debugging
    });
  }
});

// ✅ (Optional) Get all streams (for homepage later)
router.get("/all", async (req, res) => {
  try {
    const streams = await Stream.find().sort({ createdAt: -1 });

    res.json(streams);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch streams" });
  }
});

// ✅ (Optional) Get single stream
router.get("/:id", async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);

    if (!stream) {
      return res.status(404).json({ msg: "Stream not found" });
    }

    res.json(stream);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching stream" });
  }
});

module.exports = router;