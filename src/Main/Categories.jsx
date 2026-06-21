import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Categories({ selectedCategory, setSelectedCategory }) {
	let [savedCategories, setSavedCategories] = useLocalStorage("categories", [
		"All",
	]);
	useEffect(() => {
		if (!savedCategories) {
			setSavedCategories(["All"]);
		}
	}, [savedCategories, setSavedCategories]);
	useEffect(() => {
		if (!selectedCategory) {
			setSelectedCategory(["All"]);
		}
	}, [selectedCategory, setSelectedCategory]);
	function ClickHandler() {
		setSelectedCategory(event.target.outerText);
		console.log(event.target.outerText);
	}
	return (
		<nav className="w-full text-black dark:text-white md:px-6 px-2 items-center flex gap-3 overflow-scroll scroll-m-0 py-5">
			<p className="text-lg">Categories : </p>
			<div className="flex gap-4 w-20">
				{savedCategories.map((category, index) => {
					if (category == selectedCategory) {
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
