/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import CategoriesModal from "./CategoriesModal";

export default function Categories({ selectedCategory, setSelectedCategory }) {
	//Load Categories from localStorage
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
	//Select a category
	function ClickHandler() {
		setSelectedCategory(event.target.outerText);
	}
	//Set number of todo in each category
	let fakeCategoriesStatus = [];
	let [categoriesStatus, setCategoriesStatus] = useState([]);
	const [data] = useLocalStorage("todos", []);
	useEffect(() => {
		let todos = data;
		savedCategories.map((aCategory) => {
			let countOfTodosInEachCategory = 0;
			todos.map((todo) => {
				if (todo.category == aCategory) {
					countOfTodosInEachCategory += 1;
				}
			});
			fakeCategoriesStatus.push(countOfTodosInEachCategory);
		});
		//Set All category status
		let AllCategoryStatus = false;
		for (let i = 0; i < fakeCategoriesStatus.length; i++) {
			if (i != 0) {
				if (fakeCategoriesStatus[i] > 0) {
					AllCategoryStatus = true;
					fakeCategoriesStatus[0] = 1;
				}
			}
		}
		if (!AllCategoryStatus) {
			fakeCategoriesStatus[0] = 0;
		}
		console.log(fakeCategoriesStatus);

		setCategoriesStatus(fakeCategoriesStatus);
	}, [savedCategories, data]);
	//Handle categories modal display
	let [categoriesModalStatus, setCategoriesModalStatus] = useState("hidden");
	function CategoriesModalStatusHandler() {
		if (categoriesModalStatus == "hidden") {
			setCategoriesModalStatus(
				"absolute top-0 left-0 backdrop-blur-xs z-50 w-dvw h-screen flex items-center justify-center",
			);
		} else {
			setCategoriesModalStatus("hidden");
		}
	}
	return (
		<nav className="w-full text-black dark:text-white items-center flex gap-3 overflow-scroll hide-scrollbar scroll-m-0 py-5">
			<button
				className="bg-gray-100 dark:bg-neutral-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-900 rounded-full p-0.5 flex justify-center items-center"
				onClick={CategoriesModalStatusHandler}
			>
				<svg
					width="18px"
					height="18px"
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
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13.75 5C13.75 5.9665 12.9665 6.75 12 6.75C11.0335 6.75 10.25 5.9665 10.25 5C10.25 4.0335 11.0335 3.25 12 3.25C12.9665 3.25 13.75 4.0335 13.75 5ZM13.75 19C13.75 19.9665 12.9665 20.75 12 20.75C11.0335 20.75 10.25 19.9665 10.25 19C10.25 18.0335 11.0335 17.25 12 17.25C12.9665 17.25 13.75 18.0335 13.75 19ZM12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z"
							className="fill-black dark:fill-white"
						></path>{" "}
					</g>
				</svg>
			</button>
			<p className="text-lg text-nowrap">Categories :</p>
			<div className="flex gap-4">
				{savedCategories.map((category, index) => {
					if (category == selectedCategory) {
						return (
							<span
								key={index}
								className="bg-primary text-white px-3 py-0.5 rounded-2xl cursor-pointer w-max relative"
								onClick={ClickHandler}
							>
								{category}
								<div
									className={`bg-rose-500 w-4 h-4 absolute rounded-full -top-1.5 -right-1.5 ${categoriesStatus[index] > 0 ? "block" : "hidden"}`}
								></div>
							</span>
						);
					}
					return (
						<span
							key={index}
							className="dark:bg-black bg-gray-200 dark:text-white text-black px-3 py-0.5 rounded-2xl cursor-pointer w-max relative"
							onClick={ClickHandler}
						>
							{category}
							<div
								className={`bg-rose-500 w-4 h-4 absolute rounded-full -top-1.5 -right-1.5 ${categoriesStatus[index] > 0 ? "block" : "hidden"}`}
							></div>
						</span>
					);
				})}
			</div>
			<div className={categoriesModalStatus}>
				<CategoriesModal
					CloseModal={CategoriesModalStatusHandler}
					categories={savedCategories}
					setCategories={setSavedCategories}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			</div>
		</nav>
	);
}
