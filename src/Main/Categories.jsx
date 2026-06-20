import { useReducer, useState } from "react";

export default function Categories() {
	const savedCategories = localStorage.getItem("categories");
	const selectedCategory = localStorage.getItem("selectedCategory");
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	if (!savedCategories) {
		localStorage.setItem("categories", "All");
	}
	if (!selectedCategory) {
		localStorage.setItem("selectedCategory", "All");
		forceUpdate();
	}
	const [categories] = useState(() => {
		const c = localStorage.getItem("categories");
		return c ? c.split(",") : ["All"];
	});
	function ClickHandler() {
		localStorage.setItem("selectedCategory", event.target.outerText);
		forceUpdate();
	}
	return (
		<nav className="w-full text-black dark:text-white md:px-6 px-2 items-center flex gap-3 overflow-scroll scroll-m-0 py-5">
			<p className="text-lg">Categories : </p>
			<div className="flex gap-4 w-20">
				{categories.map((category, index) => {
					if (category == localStorage.getItem("selectedCategory")) {
						return (
							<span
								key={index}
								className="bg-primary text-white px-3 py-0.5 rounded-2xl cursor-pointer"
								onClick={ClickHandler}
							>
								{category}
							</span>
						);
					}
					return (
						<span
							key={index}
							className="bg-black dark:bg-white text-white dark:text-black px-3 py-0.5 rounded-2xl cursor-pointer"
							onClick={ClickHandler}
						>
							{category}
						</span>
					);
				})}
			</div>
		</nav>
	);
}
