require("dotenv").config();

const {
  IVSClient,
  CreateChannelCommand,
} = require("@aws-sdk/client-ivs");

const client = new IVSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const getStreamConfig = async () => {
  try {
    const command = new CreateChannelCommand({
      name: "stream-" + Date.now(),
      latencyMode: "LOW", // or STANDARD
      type: "STANDARD",
    });

    const response = await client.send(command);

    return {
      streamKey: response.streamKey.value,
      rtmpUrl: response.channel.ingestEndpoint, // 🔥 OBS server
      playbackUrl: response.channel.playbackUrl, // 🔥 player
    };

  } catch (err) {
    console.error("AWS IVS ERROR:", err);
    throw err;
  }
};

module.exports = { getStreamConfig };