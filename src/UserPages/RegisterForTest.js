import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

await tf.setBackend("webgl");

const RegisterForTest = () => {
	const blazeface = require("@tensorflow-models/blazeface");
	const { testid } = useParams();
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [model, setModel] = useState(null);
	const [encoder, setEncoder] = useState(null);
	const [captureCount, setCaptureCount] = useState(0);
	const [faceImage, setFaceImages] = useState([]);
	const [headerContent, setHeaderContent] = useState("");
	const [isRegistered, setIsRegistered] = useState(false);
	const [isOk, setIsOk] = useState(true);
	const navigate = useNavigate();

	const captureImage = () => {
		const imageSrc = webcamRef.current.video;

		setCaptureCount(captureCount + 1);
		(async () => {
			const output = await model.estimateFaces(imageSrc, false);
			// set canvas height and widht
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;
			const ctx = canvasRef.current.getContext("2d");
			drawOnCanvas(output, ctx, imageSrc);
		})();
	};

	const drawOnCanvas = async (prediction, ctx, video) => {
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		if (prediction.length > 0) {
			// if more than one image then warn tell user to recapture.
			if (prediction.length > 1) {
				recapture();
				alert("more than one face detected");
				return;
			}
			for (let i = 0; i < prediction.length; i++) {
				const start = prediction[i].topLeft;
				const end = prediction[i].bottomRight;
				start[1] = start[1] - 50;
				end[1] = end[1] + 50;
				const size = [end[0] - start[0], end[1] - start[1]];

				// render a rectangle over each detected faces.
				ctx.beginPath();
				ctx.lineWidth = "3";
				ctx.strokeStyle = "red";
				ctx.rect(start[0], start[1], size[0], size[1]);
				ctx.stroke();
				setHeaderContent("please wait till rectangle disappers");
				const webcamCanvas = document.createElement("canvas");
				const webcamCtx = webcamCanvas.getContext("2d");

				webcamCanvas.width = size[0];
				webcamCanvas.height = size[1];

				webcamCtx.drawImage(
					video,
					start[0],
					start[1],
					size[0],
					size[1],
					0,
					0,
					size[0],
					size[1]
				);
				setFaceImages((prevImage) => [...prevImage, webcamCanvas]);

				await new Promise((resolve) => setTimeout(resolve, 3000));

				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				setHeaderContent("");
			}
		}
	};

	const getEncodings = async (e1) => {
		const imagePixels = tf.browser.fromPixels(e1);
		const resizedImage = tf.image.resizeNearestNeighbor(
			imagePixels,
			[128, 128]
		);
		const normalizedImage = resizedImage.div(255.0);
		const inputImage = tf.expandDims(normalizedImage, 0);
		var i1 = inputImage;
		for (let i = 1; i < encoder.layers.length; i++) {
			i1 = await encoder.layers[i].apply(i1);
		}
		return i1;
	};

	const sendImagesToBackend = async () => {
		if (captureCount <= 1) {
			alert("please capture one more image");
		} else if (captureCount === 2) {
			const emb1 = await getEncodings(faceImage[0]);
			const emb2 = await getEncodings(faceImage[1]);
			tf.sum(tf.square(tf.abs(tf.sub(emb1, emb2))))
				.array()
				.then((val) => {
					if (val < 1.4) {
						const formData = new FormData();
						const token = localStorage.getItem("user_auth_token");
						formData.append(
							"embedding1",
							JSON.stringify(emb1.arraySync().flat())
						);
						formData.append("test_id", testid);
						formData.append(
							"embedding2",
							JSON.stringify(emb2.arraySync().flat())
						);
						formData.append("test_id", testid);
						axios
							.post(
								`http://127.0.0.1:8000/api/testRegistration/${testid}/`,
								formData,
								{
									headers: {
										Authorization: `Token ${token}`,
										"Content-Type": "multipart/form-data",
									},
								}
							)
							.then((res) => {
								navigate("/admin.dashboard/generalDashboard");
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						alert("need to retake images");
						recapture();
					}
				});
		}
	};

	const recapture = () => {
		setCaptureCount(0);
		setFaceImages([]);
	};
	class Lambda extends tf.layers.Layer {
		constructor() {
			super({});
		}

		// Implement the layer's computation
		async call(inputs, kwargs) {
			const x = await inputs.array();
			return tf.div(x, tf.norm(x, "euclidean", 1, true));
		}
	}
	Lambda.className = "Lambda";
	tf.serialization.registerClass(Lambda);
	useEffect(() => {
		const myfun = async () => {
			const loadModel = await blazeface.load();
			setModel(loadModel);
			tf.disposeVariables();
			const modelUrl = "http://127.0.0.1:81/model.json"; //
			const loadedModel = await tf.loadLayersModel(modelUrl);
			setEncoder(loadedModel);
			setIsOk(false);
		};

		const checkIfAlreadyRegisterd = async () => {
			const token = localStorage.getItem("user_auth_token");
			axios
				.get(`http://127.0.0.1:8000/api/testRegistration/${testid}/`, {
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					setIsRegistered(true);
				})
				.catch((err) => {
					if (err.response.data.error === "User Not Registered") {
						setIsRegistered(false);
					}
					console.log(err.response.data);
				});
		};
		checkIfAlreadyRegisterd();
		myfun();
	}, []);

	return (
		<div>
			{!isRegistered ? (
				<>
					<header className='relative p-10'>
						<Webcam
							audio={false}
							ref={webcamRef}
							className='w-[640px] h-[400px] z-10 m-auto'
							screenshotFormat='image/jpeg'
						/>
						<canvas
							ref={canvasRef}
							className='absolute top-10 left-0 right-0 w-[640px] h-[400px] z-10 m-auto'
						/>
					</header>
					<h3>{headerContent}</h3>

					<div className='actions flex gap-7 w-full justify-between p-10'>
						<button
							className='btn-primary disabled:opacity-65'
							onClick={captureImage}
							disabled={isOk || captureCount === 2}
						>
							Capture Image
						</button>
						<button
							className='btn-primary disabled:opacity-65'
							onClick={recapture}
							disabled={isOk || captureCount === 0}
						>
							ReTake Image
						</button>

						<button
							className='btn-primary disabled:opacity-65'
							onClick={sendImagesToBackend}
						>
							Register
						</button>
					</div>
					<div className='flex justify-evenly mt-10'>
						{faceImage.map((image, idx) => (
							<img
								src={image.toDataURL("image/png")}
								key={idx}
								style={{
									// maxWidth: "80%",
									maxHeight: "100%",
									display: "block",
									position: "relative",
								}}
							></img>
						))}
					</div>
				</>
			) : (
				<div className='w-full min-h-screen flex flex-col gap-5 items-center justify-center'>
					<h1 className='text-9xl font-bold text-green-600'>Wohooo!</h1>
					<h2 className='text-7xl font-bold text-green-600'>
						User Already Registered
					</h2>
				</div>
			)}
		</div>
	);
};

export default RegisterForTest;
