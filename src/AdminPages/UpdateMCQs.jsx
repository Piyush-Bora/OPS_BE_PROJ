// MCQList.js
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateMcq() {
	const [mcqs, setMCQs] = useState([]);
	const [editMode, setEditMode] = useState({});
	const { testid } = useParams();

	useEffect(() => {
		fetchMCQs();
	}, []);

	const handleEditToggle = (index) => {
		setEditMode({ ...editMode, [index]: !editMode[index] });
	};

	const handleFieldChange = (index, field, value) => {
		const updatedMcqs = [...mcqs];
		updatedMcqs[index].field = value;
		setMCQs(updatedMcqs);
	};

	const handleSave = async (index) => {
		console.log(mcqs[index]);
		const token = localStorage.getItem("user_auth_token");
		try {
			const response = await axios.put(
				`http://localhost:8000/api/mcq/${mcqs[index].qid}/`,
				mcqs[index],
				{
					headers: {
						Authorization: `Token ${token}`, // Assuming it's a Token-based authentication
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
		handleEditToggle(index);
	};

	const fetchMCQs = async () => {
		const token = localStorage.getItem("user_auth_token");
		try {
			const response = await axios.get(
				`http://localhost:8000/api/mcq/?testid=${testid}`,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			console.log(response.data.sort((a, b) => a.qid - b.qid));
			setMCQs(response.data);
		} catch (error) {
			console.error("Error fetching MCQs:", error);
		}
	};

	const handleDelete = async (mcqId) => {
		const token = localStorage.getItem("user_auth_token");
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/mcqs/${mcqId}`,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			console.log("MCQ deleted successfully:", response.data);
			fetchMCQs(); // Refresh the MCQ list after deletion
		} catch (error) {
			console.error("Error deleting MCQ:", error);
		}
	};

	return (
		<div className='mcq-list-container px-7 py-4 flex flex-wrap gap-4'>
			{mcqs.map((mcq) => (
				<div
					key={mcq.qid}
					className='flex flex-col gap-4 p-5 w-1/3 bg-slate-300 rounded-xl'
				>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Question Number
						</label>
						{editMode[mcq.qid] ? (
							<input
								className='input-box'
								type='number'
								value={mcq.qno}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "qno", e.target.value)
								}
							></input>
						) : (
							<div>{mcq.qno}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Question Text:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.question_text}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "question_text", e.target.value)
								}
							/>
						) : (
							<div>{mcq.question_text}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Option A:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.optionA}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "optionA", e.target.value)
								}
							/>
						) : (
							<div>{mcq.optionA}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Option B:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.optionB}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "optionB", e.target.value)
								}
							/>
						) : (
							<div>{mcq.optionB}</div>
						)}
					</div>

					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Option C:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.optionC}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "optionC", e.target.value)
								}
							/>
						) : (
							<div>{mcq.optionC}</div>
						)}
					</div>

					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Option D:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.optionD}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "optionD", e.target.value)
								}
							/>
						) : (
							<div>{mcq.optionD}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Correct Option:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.correct_option}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "correct_option", e.target.value)
								}
							/>
						) : (
							<div>{mcq.correct_option}</div>
						)}
					</div>

					<div className='actions flex gap-3'>
						{editMode[mcq.qid] ? (
							<button
								className='btn-primary'
								onClick={() => handleSave(mcq.qid)}
							>
								Save
							</button>
						) : (
							<button
								className='btn-primary'
								onClick={() => handleEditToggle(mcq.qid)}
							>
								Edit
							</button>
						)}
						<button
							className='btn-primary bg-red-600'
							onClick={() => handleDelete(mcq.qid)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default UpdateMcq;
