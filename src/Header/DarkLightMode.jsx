import { useState } from "react";

export default function DarkLightMode() {
	let [mode, setMode] = useState(localStorage.theme);
	window.addEventListener("load", () => {
		if (localStorage.theme == "light") {
			document.documentElement.classList.remove("dark");
		}
	});
	function ChangeDarkAndLightMode() {
		if (mode == "dark") {
			setMode("light");
			localStorage.theme = "light";
			document.documentElement.classList.remove("dark");
		} else if (mode == "light") {
			setMode("dark");
			localStorage.theme = "dark";
			document.documentElement.classList.add("dark");
		}
	}
	return (
		<button
			className="w-12 flex justify-between items-center h-6 bg-neutral-100 dark:bg-neutral-800 rounded-full p-0.5 border border-taupe-500 hover:cursor-pointer"
			onClick={ChangeDarkAndLightMode}
		>
			<div
				className="rounded-full bg-white flex justify-center items-center visible dark:invisible transition"
				onClick={ChangeDarkAndLightMode}
			>
				<svg
					width="19px"
					height="19px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						strokeLinecap="round"
						strokeLinejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
							stroke="#262626"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>{" "}
					</g>
				</svg>
			</div>
			<div
				className="rounded-full bg-black flex justify-center items-center invisible dark:visible transition"
				onClick={ChangeDarkAndLightMode}
			>
				<svg
					width="18px"
					height="18px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#ffffff"
				>
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						strokeLinecap="round"
						strokeLinejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
							fill="#000000"
						></path>{" "}
					</g>
				</svg>
			</div>
		</button>
	);
}
