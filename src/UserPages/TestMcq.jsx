import axios from "axios";
import { useState, useEffect } from "react";
// import "../styles/TestMcq.css";
export default function TestMcq() {
	const [mcqData, setMCQData] = useState([]);
	useEffect(() => {
		const getSections = async () => {
			const token = localStorage.getItem("user_auth_token");
			try {
				const response = await axios.get(
					`http://localhost:8000/api/mcq/?testid=5`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				setMCQData(response.data);
			} catch (error) {
				console.error("Error fetching sections:", error);
				console.log(error);
			}
		};

		getSections(); // Trigger the function to fetch sections
	}, []); // Run once on component mount

	const handleAnswerSelection = (qid, selectedOption, e) => {
		let newans = {
			marked_option: selectedOption,
			ques_id: qid,
			test_id: mcqData[0].test_id,
		};
		console.log(newans, "inside handle ans");
		const updatedMCQData = mcqData.map((question) => {
			if (question.qid === qid) {
				question.marked_option = selectedOption; // Update the marked option for the current question
			}
			return question;
		});
		setMCQData(updatedMCQData);
		const submitChoice = async () => {
			const token = localStorage.getItem("user_auth_token");

			try {
				const response = await axios.post(
					`http://localhost:8000/api/submitMcq/5/`,
					newans,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
			} catch (error) {
				console.error("Error fetching sections:", error);
				console.log(error);
			}
		};
		console.log("option marked");
		submitChoice();
	};

	return (
		<div className='w-full flex flex-col justify-center items-center gap-6 my-4'>
			{mcqData.map((question) => (
				<div
					key={question.qid}
					className='bg-gray-300 p-4 text-lg flex flex-col gap-3 rounded-xl min-w-[50%]'
				>
					<div className='text-2xl font-semibold text-center'>
						{question.question_text}
					</div>
					<div className='flex flex-col gap-2'>
						<div className='p-3 bg-gray-100 flex gap-x-2 rounded-lg hover:bg-gray-500 hover:text-white'>
							<input
								className='form-check-input'
								type='radio'
								name={`option_${question.qid}`}
								id={`optionA_${question.qid}`}
								value='A'
								onChange={(e) => handleAnswerSelection(question.qid, "A", e)}
								checked={question.marked_option === "A"}
							/>
							<label
								className='form-check-label'
								htmlFor={`optionA_${question.qid}`}
							>
								{question.optionA}
							</label>
						</div>
						<div className='p-3 bg-gray-100 flex gap-x-2 rounded-lg hover:bg-gray-500 hover:text-white'>
							<input
								className='form-check-input'
								type='radio'
								name={`option_${question.qid}`}
								id={`optionB_${question.qid}`}
								value='B'
								onChange={(e) => handleAnswerSelection(question.qid, "B", e)}
								checked={question.marked_option === "B"}
							/>
							<label
								className='form-check-label'
								htmlFor={`optionB_${question.qid}`}
							>
								{question.optionB}
							</label>
						</div>
						<div className='p-3 bg-gray-100 flex gap-x-2 rounded-lg hover:bg-gray-500 hover:text-white'>
							<input
								className='form-check-input'
								type='radio'
								name={`option_${question.qid}`}
								id={`optionC_${question.qid}`}
								value='C'
								onChange={(e) => handleAnswerSelection(question.qid, "C", e)}
								checked={question.marked_option === "C"}
							/>
							<label
								className='form-check-label'
								htmlFor={`optionC_${question.qid}`}
							>
								{question.optionC}
							</label>
						</div>
						<div className='p-3 bg-gray-100 flex gap-x-2 rounded-lg hover:bg-gray-500 hover:text-white'>
							<input
								className='form-check-input'
								type='radio'
								name={`option_${question.qid}`}
								id={`optionD_${question.qid}`}
								value='D'
								onChange={(e) => handleAnswerSelection(question.qid, "D", e)}
								checked={question.marked_option === "D"}
							/>
							<label
								className='form-check-label'
								htmlFor={`optionD_${question.qid}`}
							>
								{question.optionD}
							</label>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
