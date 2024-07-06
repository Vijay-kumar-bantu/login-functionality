import { Dialog, Box, Typography, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import OtpInput from "react-otp-input";
import { verifyOTP } from "../api";
import CustomizedSnackBar from "../src/components/CustomizedSnackBar";

const DialogBox = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1.3rem",
	background:
		"linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(0, 0, 4) 69%, rgb(35, 39, 46) 100%)",
	padding: "20px",
	width: "400px",
	color: "white",
	position: "relative",

	"@media screen and (max-width: 600px)": {
		width: "300px",
	},
}));

const OpenDialog = ({ open, onClose, token }) => {
	const [otp, setOtp] = useState("");
	const [barOpen, setBarOpen] = useState({ value: false, message: "" });

	const handleClose = () => {
		setOtp("");
		onClose();
	};

	const handleGetOtp = async () => {
		const response = await verifyOTP({
			token,
			otp,
		});

		if (response.status === 200) {
			setBarOpen({ value: true, message: response.data.message });
			onClose();
		} else if (response.status === 401) {
			setOtp("");
			setBarOpen({ value: true, message: response.data.message });
		} else {
			setBarOpen({ value: true, message: response.data.message });
			setOtp("");
			onClose();
		}
	};

	useEffect(() => {
		console.log(otp);
		if (otp.length === 6) {
			handleGetOtp();
		}
	}, [otp]);

	const renderBoxes = () => {
		return (
			<OtpInput
				containerStyle={{
					display: "flex",
					justifyContent: "space-evenly",
					width: "100%",
				}}
				inputStyle={{
					width: "40px",
					padding: "10px",
					fontSize: "1.5rem",
					fontWeight: "bold",
					background: "white",
					borderRadius: "5px",

					"&::focused": { outerLine: "none", border: "none" },
				}}
				value={otp}
				onChange={setOtp}
				type="text"
				numInputs={6}
				inputType="text"
				renderInput={(props) => <input {...props} />}
			/>
		);
	};
	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogBox>
					{/* closing button */}
					<Box
						sx={{
							position: "absolute",
							right: "10px",
							top: "10px",
							cursor: "pointer",
							zIndex: 100,
						}}
						onClick={handleClose}
					>
						<X />
					</Box>

					<Box>
						<Typography>Enter your OTP</Typography>
					</Box>
					<Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
						{renderBoxes()}
					</Box>
				</DialogBox>
			</Dialog>
			<CustomizedSnackBar
				open={barOpen.value}
				onClose={() => setBarOpen({ value: false, message: "" })}
				message={barOpen.message}
			/>
		</>
	);
};

export default OpenDialog;
