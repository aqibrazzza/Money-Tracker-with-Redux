import { useState } from "react";
import { useEmail } from "../../hooks/useEmail";

export default function Feedback() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [message, setMessage] = useState("");
	const { isPending, error, success, sendEmail } = useEmail();

	const onFormSubmit = async (e) => {
		e.preventDefault();
		await sendEmail({ name, email, contact, message });
		if (success) {
			setName("");
			setEmail("");
			setContact("");
			setMessage("");
		}
	};

	return (
		<form
			className="mt-20 mx-4 sm:mx-auto sm:max-w-sm rounded-md px-6 py-12 accent-blue-600 bg-gray-800 text-gray-50"
			onSubmit={onFormSubmit}
		>
			<h1 className="tracking-tight text-2xl">Provide Feedback</h1>
			<div className="flex flex-col justify-center mt-8 space-y-2">
				<label className="mr-5 text-gray-400" htmlFor="name">
					Name:
				</label>
				<input
					className="p-3 bg-gray-700 rounded"
					type="text"
					onChange={(e) => setName(e.target.value.trim())}
					value={name}
					name="name"
					required
				/>
			</div>

			<div className="flex flex-col justify-center mt-5 space-y-2">
				<label className="mr-5 text-gray-400" htmlFor="email">
					Email:
				</label>
				<input
					className="p-3 bg-gray-700 rounded"
					type="text"
					onChange={(e) => setEmail(e.target.value.trim())}
					value={email}
					name="email"
					required
				/>
			</div>

			<div className="flex flex-col justify-center mt-5 space-y-2">
				<label className="mr-5 text-gray-400" htmlFor="contact">
					Phone Number:
				</label>
				<input
					className="p-3 bg-gray-700 rounded"
					type="contact"
					onChange={(e) => setContact(e.target.value.trim())}
					value={contact}
					name="contact"
					required
				/>
			</div>

			<div className="flex flex-col justify-center mt-5 space-y-2">
				<label className="mr-5 text-gray-400" htmlFor="message">
					Message:
				</label>
				<textarea
					rows="4"
					className="p-3 bg-gray-700 rounded resize-none"
					type="text"
					onChange={(e) => setMessage(e.target.value)}
					value={message}
					name="message"
					required
				/>
			</div>

			{isPending ? (
				<button
					disabled
					className="py-3 px-9 rounded text-white mt-9 font-medium bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
				>
					Loading ...
				</button>
			) : (
				<button className="py-3 px-9 rounded text-white mt-9 font-medium bg-blue-700 hover:bg-blue-600 active:bg-blue-800">
					Send Feedback
				</button>
			)}
			{error && (
				<div className="flex space-x-2 mt-7 text-red-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-sm">{error}</p>
				</div>
			)}
		</form>
	);
}
