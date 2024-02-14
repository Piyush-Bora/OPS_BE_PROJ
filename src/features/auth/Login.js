import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";
import { useSelector } from "react-redux";

const Login = () => {
	const userRef = useRef();
	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const navigate = useNavigate();

	const { loading } = useSelector((state) => state);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		let credentials = {
			username: user,
			password: pwd,
		};
		dispatch(loginUser(credentials))
			.then((result) => {
				if (result.payload) {
					navigate("/admin.dashboard");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleUserInput = (e) => setUser(e.target.value);

	const handlePwdInput = (e) => setPwd(e.target.value);

	const content = (
		<section className='login flex flex-col gap-y-4 max-w-screen min-h-screen justify-center items-center '>
			<h1 className='text-4xl font-bold'>Employee Login</h1>

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
						id='username'
						ref={userRef}
						value={user}
						onChange={handleUserInput}
						autoComplete='off'
						required
						className='input-box'
					/>

					<label htmlFor='password' className='text-xl'>
						Password:
					</label>
					<input
						type='password'
						id='password'
						onChange={handlePwdInput}
						value={pwd}
						required
						className='input-box'
					/>
					<button className='btn-primary w-full'>
						{loading ? "Loading..." : "Sign In"}
					</button>
				</div>
			</form>
		</section>
	);

	return content;
};
export default Login;
