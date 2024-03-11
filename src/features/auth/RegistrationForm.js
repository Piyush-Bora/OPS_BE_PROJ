// RegistrationForm.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RegistrationForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading } = useSelector((state) => state);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let credentials = {
			username: username,
			password: password,
			email: email,
		};
		dispatch(registerUser(credentials))
			.then((result) => {
				if (result.payload) {
					navigate("/login");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='registration-card flex flex-col gap-y-4 max-w-screen min-h-screen justify-center items-center'>
			<h1 className='text-4xl font-bold'>User Registration</h1>

			<form
				onSubmit={handleSubmit}
				className='bg-slate-200 p-14 w-1/3 rounded-3xl'
			>
				<div className='flex flex-col gap-y-3 justify-center items-center flex-grow items-stretch'>
					<label htmlFor='username' className='text-xl'>
						Username:
					</label>
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Username'
						className='input-box'
						required
						autoComplete='true'
					/>

					<label htmlFor='password' className='text-xl'>
						Password:
					</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						className='input-box'
						required
						autoComplete='true'
					/>

					<label htmlFor='email' className='text-xl'>
						Email:
					</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						className='input-box'
						required
						autoComplete='true'
					/>
					<button className='btn-primary w-full'>
						{loading ? "Loading..." : "Register"}
					</button>
					<Link to='/login' className='btn-primary bg-blue-800'>
						Login here
					</Link>
				</div>
			</form>
		</div>
	);
}

export default RegistrationForm;
