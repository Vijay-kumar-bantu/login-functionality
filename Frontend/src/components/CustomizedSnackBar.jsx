import { Snackbar, Box } from "@mui/material";
import React from "react";
import { X } from "lucide-react";
import useMobileCheck from "../../utils/useMobileCheck";

function CustomizedSnackBar({ open, onClose, message }) {
	const isMobile = useMobileCheck();

	const action = (
		<Box onClick={onClose} sx={{ cursor: "pointer" }}>
			<X size={20} />
		</Box>
	);
	return (
		<>
			<Snackbar
				anchorOrigin={
					isMobile
						? { vertical: "top", horizontal: "right" }
						: { vertical: "bottom", horizontal: "left" }
				}
				open={open}
				onClose={onClose}
				message={message}
				autoHideDuration={5000}
				action={action}
			/>
		</>
	);
}

export default CustomizedSnackBar;
