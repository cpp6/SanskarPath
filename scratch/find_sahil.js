const mongoose = require("mongoose");
const User = require("./models/User");

const MONGODB_URI = "mongodb://localhost:27017/sanskar"; // I'll check .env.local for real one

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    const user = await User.findOne({ name: /sahil/i, role: "child" });
    if (user) {
      console.log("FOUND_USER:" + JSON.stringify(user));
    } else {
      console.log("NOT_FOUND");
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
run();
