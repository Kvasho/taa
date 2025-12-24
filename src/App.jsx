import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [loadingProgress, setLoadingProgress] = useState(0);

	useEffect(() => {
		let interval;
		const delayTimeout = setTimeout(() => {
			interval = setInterval(() => {
				setLoadingProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						return 100;
					}
					return prev + 100 / 40; // 2 seconds total (40 updates per 2 seconds)
				});
			}, 50);
		}, 1000); // 1 second delay

		return () => {
			clearTimeout(delayTimeout);
			if (interval) clearInterval(interval);
		};
	}, []);

	return (
		<div className='landing-page'>
			<div className='logo-container'>
				<img src='/logo.png' alt='TAA Logo' className='logo-image' />
			</div>

			<h1 className='company-title'>
				<span
					className='title-text'
					style={{ "--fillWidth": `${loadingProgress}%` }}
				>
					TAA
				</span>
			</h1>
		</div>
	);
}

export default App;
