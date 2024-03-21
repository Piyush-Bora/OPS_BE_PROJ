import axios from "axios";
import { useState, useEffect } from "react";

export default function Subjective({ testid }) {
	const token = localStorage.getItem("user_auth_token");
	const [subjective, setSubjective] = useState([]);

	useEffect(() => {
		const getSubjective = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/getSubjectiveQuestions/${testid}/`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				setSubjective(response.data);
			} catch (error) {
				console.error("Error fetching sections:", error);
			}
		};

		getSubjective(); // Trigger the function to fetch subjective
	}, []); // Run once on component mount

	const handleInputChange = (index, event) => {
		const { value } = event.target;
		const updatedSubjective = [...subjective];
		updatedSubjective[index].submitted_answer = value;
		setSubjective(updatedSubjective);
	};

	const saveAnswer = async (ques_id, submitted_answer) => {
		var updatedObj;
		subjective.map((sub, idx) => {
			if (sub.qid === ques_id) {
				updatedObj = {
					ques_id: sub.qid,
					submitted_answer: sub.submitted_answer,
					test_id: sub.test_id,
				};
				return;
			}
		});

		try {
			await axios.post(
				`http://localhost:8000/api/submitSubjective/${testid}/`,
				updatedObj,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			console.log("Answer saved successfully.");
		} catch (error) {
			console.error("Error saving answer:", error);
		}
	};
	return (
		<div
			contextMenuHidden={true}
			onCopy={(e) => e.preventDefault()}
			onPaste={(e) => e.preventDefault()}
			className='w-full flex flex-col justify-center items-center gap-6 my-4'
		>
			{subjective.map((ques, index) => (
				<div
					key={ques.qid}
					className='bg-gray-300 p-4 text-lg flex flex-col gap-3 rounded-xl min-w-[50%]'
				>
					<div className='text-center flex gap-3 items-center'>
						<span className='text-white font-semibold bg-slate-600 text-lg w-9 h-9 rounded-full flex justify-center items-center'>
							{index + 1}
						</span>
						<span className='text-2xl'>{ques.statement}</span>
					</div>
					<div className='w-full'>
						<textarea
							placeholder={ques.submitted_ans}
							value={ques.submitted_answer}
							onChange={(event) => handleInputChange(index, event)}
							className='w-full rounded-lg p-3'
						/>
					</div>
					<button
						className='btn-primary'
						onClick={() => saveAnswer(ques.qid, ques.submitted_answer)}
					>
						SAVE
					</button>
				</div>
			))}
		</div>
	);
}
