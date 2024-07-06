import React, { useEffect, useState } from "react";
import "../styles/loginForm.css";
import logo from "../assets/logo.png";
import { UserRound, KeyRound, Eye, EyeOff, Smartphone } from "lucide-react";
import { Box, Button, Typography, styled } from "@mui/material";
import OtpModal from "./OtpModal";
import CustomizedSnackBar from "./CustomizedSnackBar";
import { loginApi } from "../../api";
import { useForm } from "react-hook-form";

const ErrorText = styled(Typography)(() => ({
	color: "red",
	fontSize: "10px",
	lineHeight: "10px",
	textTransform: "uppercase",
	letterSpacing: "1px",
	fontWeight: "500",
}));

const ButtonText = styled(Typography)(() => ({
	color: "white",
	fontSize: "1em",
	lineHeight: "10px",
	textTransform: "uppercase",
	letterSpacing: "1px",
	fontWeight: "500",
}));

function LoginForm() {
	const [method, setMethod] = useState("user");
	const [showPassword, setShowPassword] = useState(false);
	const [open, setOpen] = useState(false);
	const [barOpen, setBarOpen] = useState({ value: false, message: "" });
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const handleEye = () => {
		setShowPassword((prev) => !prev);
	};

	const handlesubmit = async (data) => {
		const response = await loginApi({
			email: data.email,
			password: data.password,
			method: "email",
			type: method,
		});

		if (response.data) {
			setBarOpen({ value: true, message: response.data.message });
		} else {
			setBarOpen({ value: true, message: response.message });
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="loginSection">
			<div className="logoSection">
				<img src={logo} alt={"logo"} className="logo" />
				<p className="caption">Simplify Your Sales and Amplify Revenue</p>
			</div>
			<form onSubmit={handleSubmit(handlesubmit)}>
				<div className="radioGroup">
					<div>
						<input
							type="radio"
							name="method"
							id="user"
							value={"user"}
							checked={method === "user"}
							onClick={(e) => setMethod("user")}
						/>
						<label htmlFor="user">User</label>
					</div>
					<div>
						<input
							type="radio"
							name="method"
							id="manager"
							value={"manager"}
							checked={method === "manager"}
							onClick={(e) => setMethod("manager")}
						/>
						<label htmlFor="manager">Manager</label>
					</div>
				</div>
				<div className="inputGroup">
					<div>
						<UserRound />
						<input
							type={"text"}
							placeholder="Email"
							{...register("email", {
								required: "Enter email",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Enter a valid email address",
								},
							})}
						/>
					</div>
					{errors.email && <ErrorText>*{errors.email.message}</ErrorText>}
					<div>
						<KeyRound />
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							{...register("password", {
								required: true,
							})}
						/>
						<div onClick={handleEye}>{showPassword ? <EyeOff /> : <Eye />}</div>
					</div>
					{errors.password && <ErrorText>*Enter password</ErrorText>}
				</div>
				<Button variant="contained" type="submit">
					Login
				</Button>
			</form>
			<div className="otherMethods">
				<hr />
				<p>login with other methods</p>
				<hr />
			</div>
			<Button onClick={handleOpen} variant="contained">
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Smartphone />
					OTP Login
				</Box>
			</Button>
			<OtpModal
				onClose={handleClose}
				open={open}
				method={method}
				setMethod={setMethod}
			/>
			<CustomizedSnackBar
				open={barOpen.value}
				onClose={() => setBarOpen({ value: false, message: "" })}
				message={barOpen.message}
			/>
		</div>
	);
}

export default LoginForm;
