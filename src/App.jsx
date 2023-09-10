import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import { GithubLogo, LinkedinLogo, UploadSimple } from "phosphor-react";
import { InstagramLogo } from "@phosphor-icons/react";

import { useTypewriter } from "react-simple-typewriter";

function App() {
	const [transcription, setTranscription] = useState("");
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	const words = ["vídeo", "áudio"];
	const [text, helper] = useTypewriter({
		words,
		typeSpeed: 100,
		deleteSpeed: 100,
		loop: 0, // Infinit
	});

	let isButtonDisabled = isLoading || !file;

	function handleFileUpload(event) {
		const inputValue = event.target.files[0];
		setFile(inputValue);
	}

	function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		const fileUploadForm = new FormData();
		fileUploadForm.append("file", file);
		async function fetchTranscription() {
			const { data } = await axios.post(
				"http://localhost:8000/api/transcribe",
				fileUploadForm
			);
			setTranscription(data.transcription);
			setFile(null);
			setIsLoading(false);
		}
		fetchTranscription();
	}

	return (
		<div className="container">
			<header className="header-home">
				<h1>
					Transforme <span>{text}</span> em texto{" "}
				</h1>
				<p>
					Bem-vindo ao nosso serviço de transcrição de áudio para texto!
					Simplificamos a transcrição de áudios. Com nossa tecnologia de ponta,
					convertemos MP3 em texto com rapidez e precisão.
				</p>
			</header>
			<main className="main-content">
				<div className="buttons-wrapper">
					<label className="label-input-audio" htmlFor="audio">
						<UploadSimple size={24} />
						<span> {file ? file.name : "Choose .mp3 file"} </span>
					</label>
					<input
						className="input-audio"
						id="audio"
						type="file"
						onChange={(event) => handleFileUpload(event)}
					/>
					<Button
						title="Upload file"
						onClick={(event) => handleSubmit(event)}
						disabled={isButtonDisabled}
					/>
				</div>
				<div className="transcription-container">
					{transcription && <p>{transcription}</p>}
					{isLoading && <p>Loading...</p>}
				</div>
			</main>
			<footer>
				<div className="footer-content">
					<span>copyright ©2023 LWdevs </span>
					<ul className="socialmedia-container">
						<li>
							<a target="_blank" href="https://github.com/wicarpessoa">
								<GithubLogo size={20} />
							</a>
						</li>
						<li>
							<a
								target="_blank"
								href="https://www.linkedin.com/in/wicar-pessoa-5b359b233/"
							>
								<LinkedinLogo size={20} />
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	);
}

export default App;
