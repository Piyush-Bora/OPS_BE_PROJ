import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTestForm = () => {
	const [testName, setTestName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem("user_auth_token");

		try {
			// Make a POST request to your API endpoint
			const response = await axios.post(
				"http://localhost:8000/api/test/",
				{
					title: testName,
					description: description,
					start_date: startDate,
					end_date: endDate,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);

			console.log("Test created successfully:", response.data);
			navigate(`/admin.dashboard/`);
		} catch (error) {
			console.error("Failed to create test:", error);
			// Handle errors (e.g., display an error message to the user)
		}
	};

	return (
		<div className='flex max-w-screen min-h-screen justify-center items-center '>
			<form
				onSubmit={handleSubmit}
				className='bg-slate-200 p-14 w-1/3 rounded-3xl'
			>
				<div className='flex flex-col gap-y-3 justify-center items-center flex-grow items-stretch'>
					<div className='flex flex-col gap-2'>
						<label>Test Name:</label>
						<input
							type='text'
							name='test_name'
							className='input-box'
							placeholder='Enter Test Name'
							onChange={(e) => {
								setTestName(e.target.value);
							}}
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label>Description:</label>
						<input
							type='text'
							name='test_description'
							className='input-box'
							placeholder='Enter Test Description'
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label>Start Date:</label>
						<input
							type='datetime-local'
							value={startDate}
							className='input-box'
							onChange={(e) => setStartDate(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label>End Date:</label>
						<input
							type='datetime-local'
							value={endDate}
							className='input-box'
							onChange={(e) => setEndDate(e.target.value)}
							required
						/>
					</div>
					<button className='btn-primary w-full' type='submit'>
						Create Test
					</button>
				</div>
			</form>
		</div>
	);
};
