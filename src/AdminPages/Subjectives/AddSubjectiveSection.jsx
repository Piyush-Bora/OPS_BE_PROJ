import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddSubjectiveSection() {
	const { testid } = useParams();
	const navigate = useNavigate();
	console.log("printing testId", testid);
	const [question, setQuestion] = useState("");

	const handleChange = (e) => {
		setQuestion(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("user_auth_token");
		console.log(token);
		try {
			// question.test_id = testid;
			console.log(question);
			const response = await axios.post(
				"http://localhost:8000/api/subjective/",
				{ statement: question, test_id: testid },
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			toast("Subjective Question added successfully:");
			console.log(response.data);
			navigate("/admin.dashboard");
			// You can handle success, like showing a success message or redirecting the user
		} catch (error) {
			console.log(error?.response?.data?.detail);
			console.error("Failed to add Subjective Question:", error);
			// Handle errors (e.g., display an error message to the user)
		}
	};

	return (
		<div className='mcq-form-card px-7 py-2 flex justify-center items-center h-full w-full'>
			<form
				onSubmit={handleSubmit}
				className='bg-slate-200 p-5 rounded-2xl mb-4 flex flex-col gap-y-3 min-w-[50%]'
			>
				<h2 className='text-2xl font-semibold'>Question:</h2>
				<textarea
					type='text'
					value={question}
					onChange={handleChange}
					placeholder='Enter question'
					className='input-box w-full h-32'
				/>
				<button type='submit' className='btn-primary'>
					Add Subjective Question
				</button>
			</form>
		</div>
	);
}

export default AddSubjectiveSection;
