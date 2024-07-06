import axios from "axios";

const headers = {
	"Content-Type": "application/json",
};

export const loginApi = async (data) => {
	try {
		const response = await axios.request({
			method: "post",
			headers: headers,
			url: import.meta.env.VITE_LOGIN_API,
			data: data,
		});

		return response;
	} catch (error) {
		if (error.response) {
			return error.response;
		} else {
			return { message: error.message };
		}
	}
};

export const verifyOTP = async (data) => {
	try {
		const response = await axios.request({
			method: "post",
			headers: headers,
			url: import.meta.env.VITE_VERIFY_OTP,
			data: data,
		});

		return response;
	} catch (error) {
		return error.response;
	}
};
