import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowCreatedTests = () => {
	const [tests, setTests] = useState([]);
	const [editMode, setEditMode] = useState({});

	const formatDate = (date) => {
		const dateObj = new Date(date);
		const formattedDate = dayjs(dateObj).format("MMM DD, YY");
		return formattedDate;
	};

	useEffect(() => {
		fetchTests();
	}, []);

	const fetchTests = async () => {
		const token = localStorage.getItem("user_auth_token");
		console.log("token: ", token);

		try {
			// Make a POST request to your API endpoint
			const response = await axios.get("http://localhost:8000/api/test/", {
				headers: {
					Authorization: `Token ${token}`,
				},
			});

			setTests(response.data);
		} catch (error) {
			console.error("Failed to create test:", error);
			// Handle errors (e.g., display an error message to the user)
		}
	};

	const handleEditToggle = (index) => {
		setEditMode({ ...editMode, [index]: !editMode[index] });
	};

	const handleFieldChange = (index, field, value) => {
		const updatedTests = [...tests];
		updatedTests[index][field] = value;
		setTests(updatedTests);
	};

	const handleSave = async (index) => {
		const token = localStorage.getItem("user_auth_token");
		try {
			console.log(tests[index]);
			const response = await axios.put(
				`http://localhost:8000/api/test/${tests[index].testid}`,
				tests[index],
				{
					headers: {
						Authorization: `Token ${token}`, // Assuming it's a Token-based authentication
					},
				}
			);
			console.log("Test updated successfully:", response.data);
			handleEditToggle(index);
		} catch (error) {
			console.error("Error updating test:", error);
		}
	};

	const handleDelete = async (index) => {
		const token = localStorage.getItem("user_auth_token");
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/test/${tests[index].testid}`,
				{
					headers: {
						Authorization: `Token ${token}`, // Assuming it's a Token-based authentication
					},
				}
			);
			console.log("Test deleted successfully:", response.data);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting test:", error);
		}
	};

	return (
		<div className='test-list-container px-7 py-4 flex flex-wrap gap-4'>
			{tests.map((test, index) => (
				<div
					className='flex flex-col gap-4 p-5 w-1/3 bg-slate-300 rounded-xl'
					key={index}
				>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Title:
						</label>
						{editMode[index] ? (
							<input
								type='text'
								value={test.title}
								onChange={(e) =>
									handleFieldChange(index, "title", e.target.value)
								}
							/>
						) : (
							<div>{test.title}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Description:
						</label>
						{editMode[index] ? (
							<textarea
								value={test.description}
								onChange={(e) =>
									handleFieldChange(index, "description", e.target.value)
								}
							/>
						) : (
							<div>{test.description}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Start Date:
						</label>
						{editMode[index] ? (
							<input
								type='datetime-local'
								value={test.start_date}
								onChange={(e) =>
									handleFieldChange(index, "start_date", e.target.value)
								}
							/>
						) : (
							<div>{test.start_date}</div>
						)}
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							End Date:
						</label>
						{editMode[index] ? (
							<input
								type='datetime-local'
								value={test.end_date}
								onChange={(e) =>
									handleFieldChange(index, "end_date", e.target.value)
								}
							/>
						) : (
							<div>{test.end_date}</div>
						)}
					</div>
					<div className='actions flex flex-wrap gap-3'>
						{editMode[index] ? (
							<button className='btn-primary' onClick={() => handleSave(index)}>
								Save
							</button>
						) : (
							<button
								className='btn-primary'
								onClick={() => handleEditToggle(index)}
							>
								Edit
							</button>
						)}
						<button
							className='btn-primary'
							style={{ backgroundColor: "red" }}
							onClick={() => handleDelete(index)}
						>
							Delete
						</button>
						<Link
							className='btn-primary'
							to={`/admin.dashboard/addMcq/${test.testid}`}
						>
							Add MCQ
						</Link>
						<Link
							className='btn-primary'
							to={`/admin.dashboard/updateMcq/${test.testid}`}
						>
							Show MCQ
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default ShowCreatedTests;
