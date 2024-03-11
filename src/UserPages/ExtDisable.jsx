/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";

function ExtDisable() {
	const [disabledExtensions, setDisabledExtensions] = useState([]);

	useEffect(() => {
		const disableExtensions = async () => {
			try {
				const response = await chrome.runtime.sendMessage(
					"nfakobhkkhjegcmldlgbdafgeebkdkbc",
					{
						action: "disableExtensions",
					}
				);
				setDisabledExtensions(response);
			} catch (error) {
				console.error(error);
			}
		};

		disableExtensions();
	}, []);

	return (
		<div className='App'>
			<h1>Extension Disabler</h1>
			{disabledExtensions.length > 0 ? (
				<p>Successfully disabled extensions:</p>
			) : (
				<p>No extensions were disabled.</p>
			)}
			<ul>
				{disabledExtensions.map((extension) => (
					<li key={extension.name}>{extension.name}</li>
				))}
			</ul>
		</div>
	);
}

export default ExtDisable;
