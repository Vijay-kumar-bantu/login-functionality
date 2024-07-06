import {
	Dialog,
	styled,
	Typography,
	Box,
	Button,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { X } from "lucide-react";
import OpenDialog from "../../utils/openDialog";
import { loginApi } from "../../api";
import CustomizedSnackBar from "./CustomizedSnackBar";

const RadioGroup = styled(Box)(() => ({
	display: "flex",
	gap: "10px",
}));

const InputBox = styled(TextField)(() => ({
	display: "flex",
	gap: "10px",
	backgroundColor: "white",
	outline: "none",
	border: "none",
	borderRadius: "5px",

	"&::focus": {
		border: "none",
		outline: "none",
	},
}));

const ErrorText = styled(Typography)(() => ({
	color: "red",
	fontSize: "10px",
	lineHeight: "10px",
	textTransform: "uppercase",
	letterSpacing: "1px",
	fontWeight: "500",
}));

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

export default function OtpModal({ open, onClose, method, setMethod }) {
	const [value, setValue] = useState("+91");
	const [error, setError] = useState({ value: false, message: "" });
	const [otpOpen, setOtpOpen] = useState(false);
	const [token, setToken] = useState("");
	const [barOpen, setBarOpen] = useState({ value: false, message: "" });

	const handleGetOtp = async () => {
		if (value.length < 13) {
			setError({ value: true, message: "*Enter valid mobile number" });
			return;
		} else {
			const response = await loginApi({
				phone: value.slice(3),
				method: "mobile",
				type: method,
			});

			if (response.status === 201) {
				setBarOpen({ value: true, message: response.data.message });
				setToken(response.data.token);
				setError({ value: false, message: "" });
				setValue("+91");
				setOtpOpen(true);
				onClose();
			} else {
				if (response.data) {
					setBarOpen({ value: true, message: response.data.message });
				} else {
					setBarOpen({ value: true, message: response.message });
				}
			}
		}
	};
	const handleChange = (input) => {
		if (input?.length > 2 && input?.length <= 13 && Number(input)) {
			setValue(input);
		}
	};
	return (
		<>
			<Dialog
				open={open}
				onClose={() => {
					setValue("+91");
					setError({ value: false, message: "" });
					return onClose();
				}}
			>
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
						onClick={() => {
							setValue("+91");
							setError({ value: false, message: "" });
							return onClose();
						}}
					>
						<X />
					</Box>
					<RadioGroup>
						<Box>
							<input
								type="radio"
								name="method"
								id="user"
								value={"user"}
								checked={method === "user"}
								onClick={(e) => setMethod("user")}
							/>
							<label htmlFor="user">User</label>
						</Box>
						<Box>
							<input
								type="radio"
								name="method"
								id="manager"
								value={"manager"}
								checked={method === "manager"}
								onClick={(e) => setMethod("manager")}
							/>
							<label htmlFor="manager">Manager</label>
						</Box>
					</RadioGroup>
					<Box>
						<InputBox
							type="text"
							placeholder="Enter your number"
							value={value}
							onChange={(e) => handleChange(e.target.value)}
						/>
					</Box>

					{error.value && (
						<ErrorText component={"p"}>{error.message}</ErrorText>
					)}

					<Button
						variant="contained"
						sx={{ width: "100%" }}
						onClick={handleGetOtp}
					>
						<Typography>Get OTP</Typography>
					</Button>
				</DialogBox>
			</Dialog>

			<OpenDialog
				open={otpOpen}
				onClose={() => setOtpOpen(false)}
				token={token}
			/>
			<CustomizedSnackBar
				open={barOpen.value}
				onClose={() => setBarOpen({ value: false, message: "" })}
				message={barOpen.message}
			/>
		</>
	);
}
