export default function AddTodo() {
	let todos = localStorage.getItem("todos");
	let buttonClass =
		"fixed flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary sm:w-16 sm:h-16 w-14 h-14 rounded-full xl:right-8 xl:bottom-8 lg:right-5 lg:bottom-5 md:right-5 md:bottom-5 right-3 bottom-3 text-5xl bg-primary text-white";
	if (todos == null || todos == undefined || todos == "") {
		buttonClass =
			"fixed flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary sm:w-16 sm:h-16 w-14 h-14 rounded-full xl:right-8 xl:bottom-8 lg:right-5 lg:bottom-5 md:right-5 md:bottom-5 right-3 bottom-3 text-5xl bg-primary animate-bounce text-white";
	} else {
		buttonClass;
		("fixed flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary sm:w-16 sm:h-16 w-14 h-14 rounded-full xl:right-8 xl:bottom-8 lg:right-5 lg:bottom-5 md:right-5 md:bottom-5 right-3 bottom-3 text-5xl bg-primary text-white");
	}
	return (
		<div className="absolute w-full bottom-0">
			<button className={buttonClass}>
				<svg
					width="45px"
					height="45px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M6 12H18M12 6V18"
							stroke="#ffffff"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>{" "}
					</g>
				</svg>
			</button>
		</div>
	);
}
