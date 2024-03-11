import axios from "axios";
import { useState, useEffect } from "react";
// import "../styles/Subjective.css";
export default function Subjective() {
	const token = localStorage.getItem("user_auth_token");
	const [subjective, setSubjective] = useState([]);

	useEffect(() => {
		const getSubjective = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/getSubjectiveQuestions/5/`,
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

		// const token = localStorage.getItem("user_auth_token");
		try {
			await axios.post(
				`http://localhost:8000/api/submitSubjective/${updatedObj.test_id}/`,
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
		<>
			{subjective.map((ques, index) => (
				<div key={ques.qid} className='card'>
					<div className='subjective_question'>
						<h3>{ques.statement}</h3>
					</div>
					<div className='subjective_answer'>
						<textarea
							placeholder={ques.submitted_ans}
							value={ques.submitted_answer}
							onChange={(event) => handleInputChange(index, event)}
						></textarea>
					</div>
					<button onClick={() => saveAnswer(ques.qid, ques.submitted_answer)}>
						SAVE
					</button>
				</div>
			))}
		</>
	);
}
