import emailjs from "@emailjs/browser";
import { useState } from "react";

export const useEmail = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const sendEmail = async (templateParamsObj) => {
		const serviceID = process.env.REACT_APP_SERVICE_ID;
		const templateID = process.env.REACT_APP_TEMPLATE_ID;
		const publicKey = process.env.REACT_APP_PUBLIC_KEY;
		try {
			setIsPending(true);
			setError(null);
			const res = await emailjs.send(
				serviceID,
				templateID,
				templateParamsObj,
				publicKey
			);
			console.log(res);
			setIsPending(false);
			if (res.text === "OK") {
				setSuccess(true);
			}
			setError(null);
			alert("Thank you for the feedback. We will get back to you soon.");
		} catch (error) {
			setIsPending(false);
			setError(error.message);
			alert("Something went wrong. Please try again later.");
		}
	};

	return { isPending, error, success, sendEmail };
};
