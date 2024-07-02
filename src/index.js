const express = require("express");
const mongoose = require("mongoose");
const user = require("../modals/user");
const bcrypt = require("bcrypt");
const session = require("../modals/session");
const otpGenerator = require("otp-generator");
require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());

//connecting to mongoose server
mongoose
	.connect(process.env.DB_ADDRESS)
	.then(() => {
		console.log("connected to db");
	})
	.catch((err) => {
		console.log(err);
	});

//login api routes
app.get("/", (req, res) => {
	res.send("Welcome to the login api");
});

app.post("/signup", async (req, res) => {
	const { name, email, phone, password, role } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	user
		.create({ name, email, phone, password: hashedPassword, role })
		.then((data) => {
			res.status(201).send({ message: "User created" });
		})
		.catch((err) => {
			res.status(500).json({ message: "User not created" });
		});
});

app.post("/login", async (req, res) => {
	const { phone, email, password, type, method } = req.body;

	//email login method
	if (method == "email") {
		const userData = await user.findOne({ email, role: type });

		if (!userData) {
			return res.status(404).json({ message: "User not found" });
		}

		if (await bcrypt.compare(password, userData.password)) {
			return res.status(200).json({ message: "Login successful" });
		} else {
			return res.status(401).json({ message: "Invalid credentials" });
		}
	}

	//OTP login method
	if (method == "mobile") {
		const userData = await user.findOne({ phone, role: type });

		if (!userData) {
			return res.status(404).json({ message: "User not found" });
		}

		const sessionOtp = otpGenerator.generate(6, {
			lowerCaseAlphabets: false,
			upperCaseAlphabets: false,
			specialChars: false,
		});

		session
			.updateOne({ user: userData._id }, { otp: sessionOtp }, { upsert: true })
			.then((data) => {
				res.status(201).json({ message: "Otp sent", token: userData._id });
			})
			.catch((err) => {
				res.status(500).json({ message: "Otp not sent due to Internal error" });
			});
	}
});

//verifying the otp
app.post("/verify-otp", (req, res) => {
	const { token, otp } = req.body;

	session
		.findOne({ user: token })
		.then((data) => {
			if (data.otp == otp) {
				session.deleteOne({ user: token });
				return res
					.status(200)
					.json({ message: "Otp verified & Login successful" });
			} else {
				return res.status(401).json({ message: "Invalid otp" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Internal error" });
		});
});

//starting the server
app.listen(process.env.SERVER_PORT, () => {
	console.log("server started");
});
