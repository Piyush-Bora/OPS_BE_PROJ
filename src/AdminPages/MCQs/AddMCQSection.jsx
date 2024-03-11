import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddMCQSection() {
	const { testid } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		qno: 0,
		qtionC: "",
		optiouestion_text: "",
		optionA: "",
		optionB: "",
		opnD: "",
		correct_option: "A", // Default correct option
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("user_auth_token");
		try {
			formData.test_id = testid;
			const response = await axios.post(
				"http://localhost:8000/api/mcq/",
				formData,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			console.log("MCQ added successfully:", response.data);
			navigate("/admin.dashboard");
			// You can handle success, like showing a success message or redirecting the user
		} catch (error) {
			alert(error.response.data.detail);
			console.error("Failed to add MCQ:", error);
			// Handle errors (e.g., display an error message to the user)
		}
	};

	return (
		<div className='mcq-form-card px-7 py-2 flex justify-center items-center h-full w-full'>
			<div className='flex flex-col bg-slate-400 p-5 rounded-2xl gap-y-4 w-1/3'>
				<h2 className='text-3xl font-bold self-center'>Add MCQ</h2>
				<form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Question Number:</label>
						<input
							type='number'
							name='qno'
							value={formData.qno}
							onChange={handleChange}
							required
							className='input-box'
						/>
					</div>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Question Text:</label>
						<input
							type='text'
							name='question_text'
							value={formData.question_text}
							onChange={handleChange}
							required
							className='input-box'
						/>
					</div>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Option A:</label>
						<input
							type='text'
							name='optionA'
							value={formData.optionA}
							onChange={handleChange}
							required
							className='input-box'
						/>
					</div>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Option B:</label>
						<input
							type='text'
							name='optionB'
							value={formData.optionB}
							onChange={handleChange}
							required
							className='input-box'
						/>
					</div>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Option C:</label>
						<input
							type='text'
							name='optionC'
							value={formData.optionC}
							onChange={handleChange}
							required
							className='input-box'
						/>
					</div>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Option D:</label>
						<input
							type='text'
							name='optionD'
							value={formData.optionD}
							onChange={handleChange}
							required
							className='input-box'
						/>
					</div>
					<div className='form-group flex flex-col gap-y-2'>
						<label>Correct Option:</label>
						<select
							name='correct_option'
							value={formData.correct_option}
							onChange={handleChange}
							required
							className='input-box'
						>
							<option value='A'>A</option>
							<option value='B'>B</option>
							<option value='C'>C</option>
							<option value='D'>D</option>
						</select>
					</div>
					<button type='submit' className='btn-primary'>
						Add MCQ
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddMCQSection;
