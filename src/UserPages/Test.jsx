import React, { useEffect, useRef, useState } from "react";
import Rightsection from "./RightSection";
import Listsections from "./ListSections";
import TestMcq from "./TestMcq";
import Subjective from "./Subjective";
import { Link } from "react-router-dom";
import screenfull from "screenfull";
import WarningOverlay from "./WarningOverlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Test() {
	const ele = document.getElementById("testPage");
	const [fullscreenOverlay, setFullscreenOverlay] = useState(false);
	const [isActive, setIsActive] = useState(true);

	const toggleFullScreen = () => {
		if (screenfull.isEnabled) {
			screenfull.request(document.documentElement);
		}
	};

	useEffect(() => {
		const handleTabBlur = () => {
			setIsActive(false);
			// alert("Please focus on the exam tab.");
		};

		const handleTabFocus = () => {
			toast("Tab Switched!!");
			setIsActive(true);
		};

		window.addEventListener("blur", handleTabBlur);
		window.addEventListener("focus", handleTabFocus);

		return () => {
			window.removeEventListener("blur", handleTabBlur);
			window.removeEventListener("focus", handleTabFocus);
		};
	}, []);

	useEffect(() => {
		// Event listener for fullscreen changes
		const changeHandler = () => {
			if (!screenfull.isFullscreen) {
				// Not full screen, show the overlay
				setFullscreenOverlay(true);
			} else {
				// Fullscreen, hide the overlay
				setFullscreenOverlay(false);
			}
		};

		screenfull.on("change", changeHandler);
	}, [fullscreenOverlay]);

	const [view, setView] = useState(null);
	const changeView = (e) => {
		console.log("change view");
		setView(e.target.innerHTML);
	};
	return (
		<div
			contextMenuHidden={true}
			onCopy={(e) => e.preventDefault()}
			onPaste={(e) => e.preventDefault()}
			id='testPage'
			className='flex flex-col w-full min-h-full'
		>
			<ToastContainer />
			{/* {!isActive && (
				<WarningOverlay
					text='Tab Switch Warning'
					cta='Understood'
				/>
			)} */}
			{fullscreenOverlay && (
				<WarningOverlay
					text='Full screen Mode Exit Warning'
					cta='Switch to Full Screen Mode'
					action={toggleFullScreen}
				/>
			)}
			<div className='flex items-center justify-between max-w-full min-h-[128px] bg-gray-400'>
				<div className='flex flex-grow justify-between px-5 flex-start '>
					<Link className='btn-primary h-fit' to='/section'>
						Sections
					</Link>
					<Link className='btn-primary h-fit' to='/submit'>
						Submit Test
					</Link>
				</div>
				{/* <Rightsection /> */}
			</div>
			<div className='flex flex-col p-5'>
				<div className='flex justify-evenly'>
					<Listsections sec={view} changeView={changeView} />
				</div>
				{view === "MCQ" ? (
					<div className='h-full'>
						<TestMcq />
					</div>
				) : (
					<div className='f-full'>
						{/* <h1>{ view}</h1> */}
						<Subjective />
					</div>
				)}
			</div>
		</div>
	);
}

export default Test;
