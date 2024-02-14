import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (credentials) => {
		const req = await axios.post(
			"http://localhost:8000/api/login/",
			credentials
		);
		const response = await req.data;
		console.log({ response });
		localStorage.setItem("user_auth_token", response.token);
		localStorage.setItem("user_id", response.user_id);
		return response;
	}
);

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (credentials) => {
		const req = await axios.post(
			"http://localhost:8000/api/register/",
			credentials
		);
		const response = await req.data;
		// Store token and user ID if registration is successful
		if (response.success) {
			localStorage.setItem("user_id", response.user_id);
			localStorage.setItem("username", response.username);
			localStorage.setItem("user_email", response.email);
		}
		return response;
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: { loading: false, user: null, token: null },
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.user = null;
				state.token = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				const { token, user_id } = action.payload;
				state.user = user_id;
				state.token = token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.token = null;
				console.log(action.error.message);
			})

			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.user = null;
				state.email = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				const { email, user_id } = action.payload;
				state.user = user_id;
				state.email = email;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.email = null;
				console.log(action.error.message);
			});
	},
});

// export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentEmail = (state) => state.auth.email;
