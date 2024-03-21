// import { Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";
import DetectRTC from "detectrtc";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
// import NetworkSpeed from "network-speed"; // ES5
import { ReactInternetSpeedMeter } from "react-internet-meter";
// import DetectRTC from "detectrtc";

// const testNetworkSpeed = new NetworkSpeed();

var buttonViewDisabled = true;

function ValidateCheck() {
	var isAllowed = false;

	//Network Check
	var netSpeedVar = sessionStorage.getItem("netspeed");
	if (netSpeedVar > 2) {
		isAllowed = true;
	}

	// Browser Check
	if (DetectRTC.browser.isChrome) {
		//.................................Chrome
		// If Browser is Chrome
		if (DetectRTC.browser.version > 80) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal("Please Update Browser or Try a Different Browser");
			isAllowed = false;
		}
	}
	if (DetectRTC.browser.isFirefox) {
		//.................................Firefox
		// If Browser is Chrome
		if (DetectRTC.browser.version > 60) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal("Please Update Browser or Try a Different Browser");
			isAllowed = false;
		}
	}
	if (DetectRTC.browser.isSafari) {
		//.................................Safari
		// If Browser is Chrome
		if (DetectRTC.browser.version > 12) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal("Please Update Browser or Try a Different Browser");
			isAllowed = false;
		}
	}
	if (DetectRTC.browser.isOpera) {
		//.................................Opera
		// If Browser is Chrome
		if (DetectRTC.browser.version > 60) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal("Please Update Browser or Try a Different Browser");
			isAllowed = false;
		}
	}
	if (DetectRTC.browser.isEdge) {
		//.................................Edge
		// If Browser is Chrome
		if (DetectRTC.browser.version > 80) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal("Please Update Browser or Try a Different Browser");
			isAllowed = false;
		}
	}

	// OS Check
	// Note: Not sure WHat we are going to do with This

	// Camera Permission
	DetectRTC.load(function () {
		const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
		if (!webcam) {
			navigator.getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia;

			var video = document.querySelector("#videoElement");
			if (navigator.getUserMedia) {
				navigator.mediaDevices
					.getUserMedia({ video: true })
					.then(function (stream) {
						video.srcObject = stream;
					})

					.catch(function (err0r) {
						//console.log("Something went wrong!");
					});
			}
		}
	});

	const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
	//console.log(webcam)
	if (webcam) {
		isAllowed = true;
	} else {
		isAllowed = false;
	}

	// Final Approval
	if (isAllowed) {
		buttonViewDisabled = false;
	} else {
		buttonViewDisabled = true;
	}
}

const StartTest = (props) => {
	const { testid } = useParams();

	useEffect(() => {
		const handleEntry = (entry) => {
			// Introduce a small delay to allow resources to load
			setTimeout(() => {
				if (entry.transferSize !== undefined && entry.duration !== 0) {
					const download = entry.transferSize / (entry.duration / 1000);
					const downSpeed = download / 1024 / 1024;
					sessionStorage.setItem("netspeed", downSpeed.toFixed(2));
				}
			}, 1000); // Adjust delay as needed
		};

		const observer = new PerformanceObserver(handleEntry);
		observer.observe({ type: "resource" });

		return () => observer.disconnect();
	}, []);

	ValidateCheck();

	function handleClick() {
		navigate("/validate");
	}

	const navigate = useNavigate();

	const handleStartTestClick = () => {
		if (screenfull.isEnabled) {
			screenfull.request();
		}
		navigate(`/test/${testid}`);
	};

	useEffect(() => {
		const extensionId = "nfakobhkkhjegcmldlgbdafgeebkdkbc"; // Replace with the actual extension ID
		const resourceUrl = `chrome-extension://${extensionId}/options.html`;

		fetch(resourceUrl)
			.then(() => {
				sessionStorage.setItem("extension_present", true);
			})
			.catch(() => {
				sessionStorage.setItem("extension_present", false);
			});
	}, []);

	return (
		<div className='flex flex-col items-center justify-center'>
			<div>
				<p align='center'>System Compatibility Check</p>
				<table align='center'>
					<tbody>
						<tr>
							<td>
								<ul>
									<li class='test'>
										<span>
											<b>OS:</b>{" "}
											{"- " +
												JSON.stringify(DetectRTC.osName, null, 2).slice(1, -1) +
												" " +
												JSON.stringify(DetectRTC.osVersion, null, 0).slice(
													1,
													-1
												)}{" "}
										</span>
									</li>
									<li class='test'>
										<span>
											<b>Browser:</b>{" "}
											{"- " +
												JSON.stringify(DetectRTC.browser.name).slice(1, -1) +
												" " +
												JSON.stringify(DetectRTC.browser.version)}{" "}
										</span>
									</li>
									<li class='test'>
										<span>
											<b>Internet Speed:</b>{" "}
											{"- " + sessionStorage.getItem("netspeed") + " mbps"}{" "}
										</span>
									</li>
									<li class='test'>
										<span>
											<b>Webcam:</b>{" "}
											{"- " +
												JSON.stringify(
													DetectRTC.isWebsiteHasWebcamPermissions
												)}{" "}
										</span>
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>

				<center>
					<button
						className='btn-primary'
						variant='contained'
						color='secondary'
						onClick={handleClick}
					>
						Activate Your WebCam and Network Check
					</button>
					<br />
					<br />
				</center>

				<center>
					<button
						className='btn-primary disabled:opacity-65'
						size='large'
						disabled={false}
						variant='contained'
						color='primary'
						onClick={handleStartTestClick}
					>
						Next
					</button>
				</center>
			</div>
		</div>
	);
};

export default StartTest;
