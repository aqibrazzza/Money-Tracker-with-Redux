import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/user/userSlice";

export default function Navbar() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	return (
		<div className="bg-gray-800 py-4 flex justify-between items-center px-4 md:px-16 lg:px-28 xl:px-44">
			<div className="flex items-center">
				<h1 className="text-white">
					<Link
						className="flex justify-between items-center space-x-2"
						to="/"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span className="font-semibold tracking-tight text-xl lsm:text-2xl mr-4 ">
							{" "}
							Money Tracker{" "}
						</span>
					</Link>
				</h1>
			</div>

			<div className="flex space-x-4 items-center">
				{/* if user is not signed in, then show the login and signup */}
				{!user && (
					<>
						<Link
							className="text-gray-400 font-medium hover:text-white active:text-gray-200"
							to="/login"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="font-medium py-2 px-4 rounded text-gray-50 bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
						>
							<span className="opacity-100">Sign up</span>
						</Link>
					</>
				)}
				{/* if user is signed in, then show the logout*/}
				{user && (
					<>
						<span className="text-gray-400 capitalize">
							Hi,
							{user && user.displayName.split(" ")[0]}
							{/* {userState.user.displayName.split(" ")[0]} */}
						</span>
						<button
							onClick={() => dispatch(logout())}
							className="text-gray-50 font-medium py-2 px-4 bg-red-800 rounded hover:bg-red-700 active:bg-red-900"
						>
							Logout
						</button>
					</>
				)}
			</div>
		</div>
	);
}
