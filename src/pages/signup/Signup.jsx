import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../Features/user/userSlice";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");

	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);

	const isPending = userState.isPending;
	const error = userState.error;

	const onFormSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);
		dispatch(signup({ email, password, displayName }));
	};

	return (
		<>
			<form
				className="mt-40 mx-4 sm:mx-auto sm:max-w-sm rounded-md px-6 py-12 accent-blue-600 bg-gray-800 text-gray-50"
				onSubmit={onFormSubmit}
			>
				<h1 className="tracking-tight text-2xl">Create an account</h1>
				<div className="flex flex-col justify-center mt-8 space-y-2">
					<label className="mr-5 text-gray-400" htmlFor="email">
						Email
					</label>
					<input
						className="py-3 px-3 bg-gray-700 rounded"
						name="email"
						type="text"
						onChange={(e) => setEmail(e.target.value.trim())}
						value={email}
						required
					/>
				</div>
				<div className="flex flex-col justify-center mt-5 space-y-2">
					<label className="mr-5 text-gray-400" htmlFor="password">
						Password
					</label>
					<input
						className="p-3 bg-gray-700 rounded"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						name="password"
						required
					/>
				</div>

				<div className="flex flex-col justify-center mt-5 space-y-2">
					<label className="mr-5 text-gray-400" htmlFor="displayName">
						Display Name
					</label>
					<input
						className="p-3 bg-gray-700 rounded"
						type="text"
						onChange={(e) => setDisplayName(e.target.value)}
						value={displayName}
						name="displayName"
						required
					/>
				</div>

				{isPending ? (
					<button
						disabled
						className="py-3 px-9 rounded mt-9 font-medium bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
					>
						Loading ...
					</button>
				) : (
					<button className="py-3 px-9 rounded mt-9 font-medium bg-blue-700 hover:bg-blue-600 active:bg-blue-800">
						Sign up
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
		</>
	);
}
