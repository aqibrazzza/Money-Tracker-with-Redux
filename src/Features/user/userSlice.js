import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectAuth } from "../../firebase/config";

const initialState = {
	isPending: false,
	error: null,
	authIsReady: false,
	user: null,
};

export const signup = createAsyncThunk(
	"user/signup",
	async ({ email, password, displayName }) => {
		const res = await projectAuth.createUserWithEmailAndPassword(
			email,
			password
		);
		await projectAuth.currentUser.updateProfile({ displayName });
		return res.user;
	}
);

export const logout = createAsyncThunk("user/signOut", async () => {
	return await projectAuth.signOut();
});

export const login = createAsyncThunk(
	"user/login",
	async ({ email, password }) => {
		console.log(email, password);
		const res = await projectAuth.signInWithEmailAndPassword(
			email,
			password
		);
		return res.user;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// onAuthStateChanged function
		authState: (state, action) => {
			state.user = action.payload;
			state.authIsReady = true;
		},
	},
	extraReducers: (builder) => {
		//signup reducers
		builder.addCase(signup.pending, (state, action) => {
			state.error = null;
			state.isPending = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isPending = false;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.isPending = false;
			state.error = action.error.message;
		});
		//logout reducers
		builder.addCase(logout.fulfilled, (state) => {
			state.user = null;
		});
		//login reducers
		builder.addCase(login.pending, (state) => {
			state.error = null;
			state.isPending = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isPending = false;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isPending = false;
			state.error = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const { authState } = userSlice.actions;
