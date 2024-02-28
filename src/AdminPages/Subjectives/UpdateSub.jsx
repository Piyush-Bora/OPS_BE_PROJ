// MCQList.js
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateSub = () => {
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
		const updatedMcqs = [...mcqs]; // Create a copy of the mcqs array to avoid direct mutation

		updatedMcqs[index][field] = value; // Update the specific property using bracket notation

		setMCQs(updatedMcqs); // Update the state with the modified array
	};

	const handleSave = async (index) => {
		console.log(mcqs[index]);
		const token = localStorage.getItem("user_auth_token");
		try {
			const response = await axios.put(
				`http://localhost:8000/api/subjective/${mcqs[index].qid}/`,
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
				`http://localhost:8000/api/subjective/?testid=${testid}`,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			console.log(response.data.sort((a, b) => a.qid - b.qid));
			setMCQs(response.data);
		} catch (error) {
			console.error("Error fetching SQs:", error);
		}
	};

	const handleDelete = async (mcqId) => {
		const token = localStorage.getItem("user_auth_token");
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/subjective/${mcqId}`,
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
							Question:
						</label>
						{editMode[mcq.qid] ? (
							<textarea
								className='input-box'
								value={mcq.statement}
								onChange={(e) =>
									handleFieldChange(mcq.qid, "statement", e.target.value)
								}
							/>
						) : (
							<div>{mcq.statement}</div>
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
};

export default UpdateSub;
