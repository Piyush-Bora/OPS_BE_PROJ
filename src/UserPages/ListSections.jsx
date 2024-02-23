import { useEffect, useState } from "react";
import axios from "axios";
export default function Listsections({ sec, changeView }) {
	const [section, setSection] = useState([]);

	useEffect(() => {
		const getSections = async () => {
			const token = localStorage.getItem("user_auth_token");
			try {
				const response = await axios.get(
					`http://localhost:8000/api/getSection/5`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				setSection(response.data);
			} catch (error) {
				console.error("Error fetching sections:", error);
				console.log(error);
			}
		};

		getSections(); // Trigger the function to fetch sections
	}, []); // Run once on component mount

	return (
		<>
			{section.map((val, idx) => (
				<button
					className='btn-primary'
					onClick={(e) => changeView(e)}
					key={val.sid}
				>
					{val.qtype}
				</button>
			))}
		</>
	);
}
