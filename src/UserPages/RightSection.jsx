import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import { useParams } from "react-router-dom";

export default function Rightsection() {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [model, setModel] = useState(null);
	const [embeddings, setEmbeddings] = useState(null);
	const [encoder, setEncoder] = useState(null);
	const [suspicion, setSuspicion] = useState(0);
	const blazeface = require("@tensorflow-models/blazeface");
	const { testid } = useParams();

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

	const captureImage = () => {
		const imageSrc = webcamRef.current.video;
		if (model) {
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
		} else {
			console.log("face blaze not loaded yet");
		}
	};

	const drawOnCanvas = async (prediction, ctx, video) => {
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		if (prediction.length > 0) {
			// if more than one image then warn tell user to recapture.
			if (prediction.length > 1) {
				alert("more than one face detected");
				setSuspicion(suspicion + 1);
				return;
			}
			if (encoder) {
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
					if (embeddings) {
						const emb3 = tf.tensor(JSON.parse(embeddings.embedding1), [1, 256]);
						const emb4 = tf.tensor(JSON.parse(embeddings.embedding2), [1, 256]);
						const current_embedding = await getEncodings(webcamCanvas);
						tf.sum(tf.square(tf.abs(tf.sub(emb3, current_embedding))))
							.array()
							.then((val) => {
								console.log(
									val < 1.4
										? "match with embedding 1"
										: "not match with embeddin 1"
								);
							});

						tf.sum(tf.square(tf.abs(tf.sub(emb4, current_embedding))))
							.array()
							.then((val) => {
								console.log(
									val < 1.4
										? "match with embedding 2"
										: "not match with embedding 2"
								);
							});
					} else {
						console.log("embedding not found");
					}
					await new Promise((resolve) => setTimeout(resolve, 3000));

					ctx.clearRect(
						0,
						0,
						canvasRef.current.width,
						canvasRef.current.height
					);
				}
			} else {
				console.log("embedding model not loaded yet");
			}
		}
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
		const getEmbeddings = async () => {
			const token = localStorage.getItem("user_auth_token");
			try {
				const response = await axios.get(
					`http://localhost:8000/api/testRegistration/${testid}/`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				setEmbeddings(response.data);
			} catch (error) {
				console.error("Error fetching embeddings:", error);
			}
			await tf.setBackend("webgl");

			console.log("embedding done");
		};

		const loadFaceBlazeModel = async () => {
			const loadedModel = await blazeface.load();
			setModel(loadedModel);
			console.log("face blaze model loaded");
		};

		const loadFaceEmbeddingModel = async () => {
			tf.disposeVariables();
			const modelUrl = "http://127.0.0.1:81/model.json"; // node static file / cloud bucket.
			try {
				const loadedModel = await tf.loadLayersModel(modelUrl);
				setEncoder(loadedModel);
			} catch {
				console.log("err in loading");
			}
			console.log("face embedding model loaded");
		};

		getEmbeddings(); // Trigger the function to fetch sections
		loadFaceBlazeModel();
		loadFaceEmbeddingModel();
	}, []); // Run once on component mount

	useEffect(() => {
		if (model) {
			setInterval(captureImage, 10000);
		}
	}, [model]);

	return (
		<div className='relative min-w-[180px] min-h-[128px] bg-black'>
			<Webcam
				ref={webcamRef}
				className='absolute top-0 left-0 max-w-full max-h-full z-10'
			/>
			<canvas
				ref={canvasRef}
				className='absolute top-0 left-0 max-w-full max-h-full z-10'
			/>
		</div>
	);
}
