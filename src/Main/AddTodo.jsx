import { useState } from "react";
import AddTodoModal from "./AddTodoModal";

export default function AddTodo({
	data,
	setValue,
	removeValue,
	selectedCategory,
	setSelectedCategory,
}) {
	//Handle button animation
	let todos = data;
	let buttonClass =
		"fixed flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary sm:w-16 sm:h-16 w-14 h-14 rounded-full xl:right-8 xl:bottom-8 lg:right-5 lg:bottom-5 md:right-5 md:bottom-5 right-3 bottom-3 text-5xl bg-primary text-white transition-all duration-300";
	if (todos == null || todos == undefined || todos == "") {
		buttonClass =
			"fixed flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary sm:w-16 sm:h-16 w-14 h-14 rounded-full xl:right-8 xl:bottom-8 lg:right-5 lg:bottom-5 md:right-5 md:bottom-5 right-3 bottom-3 text-5xl bg-primary animate-bounce text-white transition-all duration-300";
	} else {
		buttonClass;
		("fixed flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary sm:w-16 sm:h-16 w-14 h-14 rounded-full xl:right-8 xl:bottom-8 lg:right-5 lg:bottom-5 md:right-5 md:bottom-5 right-3 bottom-3 text-5xl bg-primary text-white transition-all duration-300");
	}
	//Handle button click
	let [modalStatus, setModalStatus] = useState(
		"w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
	);
	let [status, setStatus] = useState(false);
	function ClickHandler() {
		if (status == false) {
			setModalStatus(
				"w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setModalStatus(
					"w-dvw h-dvh flex inset-0 items-center justify-center backdrop-blur-xs pointer-events-auto opcaity-100 scale-100 transition-all",
				);
			}, 1);
			setStatus(true);
		} else if (status == true) {
			setModalStatus(
				"w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setModalStatus(
					"w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
				);
			}, 1);
			setStatus(false);
		}
	}
	let [newCategoryModalClass, setNewCategoryModalClass] = useState("hidden");
	function HandleCloseModal(event) {
		if (
			event.target.className ===
				"w-dvw h-dvh flex inset-0 items-center justify-center backdrop-blur-xs pointer-events-auto opcaity-100 scale-100 transition-all" &&
			newCategoryModalClass === "hidden"
		) {
			setModalStatus(
				"w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setModalStatus(
					"w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
				);
			}, 50);
			setStatus(false);
		}
	}
	return (
		<div className="fixed right-0 w-full bottom-0" onClick={HandleCloseModal}>
			<button className={buttonClass} onClick={ClickHandler}>
				<svg
					width="45px"
					height="45px"
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
							d="M6 12H18M12 6V18"
							stroke="#ffffff"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>{" "}
					</g>
				</svg>
			</button>
			<div className={modalStatus}>
				<AddTodoModal
					CloseModal={ClickHandler}
					data={data}
					setValue={setValue}
					removeValue={removeValue}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					newCategoryModalClass={newCategoryModalClass}
					setNewCategoryModalClass={setNewCategoryModalClass}
				/>
			</div>
		</div>
	);
}
