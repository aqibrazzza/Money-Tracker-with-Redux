import { useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Navbar from "../components/Navbar";
import Feedback from "../pages/feedback/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../Features/user/userSlice";

function App() {
	const dispatch = useDispatch();
	const { user, authIsReady } = useSelector((state) => state.user);

	//TODO move this check authstate functionality to redux
	useEffect(() => {
		const unsub = projectAuth.onAuthStateChanged((user) => {
			dispatch(authState(user));
			unsub();
		});
	}, [dispatch]);

	return (
		<div className="App bg-gray-900 min-h-screen">
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={user ? <Home /> : <Login />} />
						<Route
							path="/login"
							element={
								user ? <Navigate to="/" replace /> : <Login />
							}
						/>
						<Route
							path="/Signup"
							element={
								user ? <Navigate to="/" replace /> : <Signup />
							}
						/>

						<Route
							path="/feedback"
							element={
								user ? (
									<Feedback />
								) : (
									<Navigate to="/login" replace />
								)
							}
						/>

						{/* If route does not match, show the following. */}
						<Route
							path="*"
							element={
								<h1 className="mt-40 text-red-600 text-xl text-center w-4/5 mx-auto tracking-wide">
									404: Nothing found at this link.
								</h1>
							}
						/>
					</Routes>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
