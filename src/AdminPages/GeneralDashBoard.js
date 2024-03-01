import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowCreatedTests = () => {
	const [tests, setTests] = useState([]);

	useEffect(() => {
		fetchTests();
	}, []);

	const fetchTests = async () => {
		const token = localStorage.getItem("user_auth_token");
		console.log("token: ", token);

		try {
			// Make a POST request to your API endpoint
			const response = await axios.get("http://127.0.0.1:8000/api/generalDashboard", {
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
    
    const handleSave = async () => {
        
    }

	return (
		<div className='test-list-container px-5 py-4 grid grid-cols-3 gap-4'>
			{tests.map((test, index) => (
				<div
					className='flex flex-col gap-4 p-5 w-1/3 bg-slate-300 rounded-xl w-full'
					key={index}
				>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Title:
                        </label>
                        <div>{test.title}</div>
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Description:
                        </label>
                        <div>{test.description}</div>
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							Start Date Tech:
                        </label>
                        <div>{test.start_date}</div>
					</div>
					<div className='flex justify-between'>
						<label className='font-semibold bg-slate-500 text-white p-2 rounded-xl'>
							End Date:
                        </label>
                        <div>{test.end_date}</div>
                    </div>
                    <button className='btn-primary' onClick={() => handleSave(index)}>
								Register
                    </button>
                    <button className='btn-primary' onClick={() => handleSave(index)}>
								Start Test
                    </button>
					
				</div>
			))}
		</div>
	);
};

export default ShowCreatedTests;
