const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	otp: { type: String, required: "true" },
	createdAt: { type: Date, default: Date.now, expires: 3000 },
});

module.exports = mongoose.model("session", sessionSchema);
