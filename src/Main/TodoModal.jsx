/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";

export default function AddTodoModal({
	CloseModal,
	newCategoryModalClass,
	setNewCategoryModalClass,
	title,
	previousTilte,
	previousCategory,
	previousDescription,
}) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	let [categories, setCategories] = useLocalStorage("categories", ["All"]);
	let [, setUserSelectedCategory] = useLocalStorage("selectedCategory");
	let [selectedCategory, setSelectedCategory] = useState("NoCategory");
	let [inputValue, setInputValue] = useState("");
	let [newCategoryInput, setNewCategoryInput] = useState("");
	let [textareaValue, setTextareaValue] = useState("");
	let [buttonText, setButtonText] = useState("Add");
	useEffect(() => {
		if (title === "EDIT TODO") {
			setInputValue(previousTilte);
			setSelectedCategory(previousCategory);
			setTextareaValue(previousDescription);
			setButtonText("Edit");
		} else {
			setInputValue("");
			setSelectedCategory("NoCategory");
			setTextareaValue("");
			setButtonText("Add");
		}
	}, [previousCategory, previousDescription, previousTilte, title]);
	let [UniqueCategoryClass, setUniqueCategoryClass] = useState("hidden");
	function AddCategoryClickHandler() {
		let newCategory = newCategoryInput;
		let isUnique = true;
		for (const category of categories) {
			if (newCategory == category) {
				isUnique = false;
			}
		}
		if (newCategory) {
			if (isUnique) {
				let newCategories = [...categories, newCategory.trim()];
				setCategories(newCategories);
				forceUpdate();
				Categories();
				setSelectedCategory(newCategory);
				setNewCategoryModalClass("hidden");
			} else {
				setUniqueCategoryClass("text-xs text-red-600 ml-2");
			}
		} else {
			setSelectedCategory("NoCategory");
		}
	}
	//Render Categories in select
	function Categories() {
		return categories.map((category, index) => {
			if (category != "All" && category != "") {
				return (
					<option value={category} key={index}>
						{category}
					</option>
				);
			}
			return null;
		});
	}
	//Reset Modal for reuse
	function SelectChangeHandler() {
		setSelectedCategory(event.target.value);
	}
	function InputChangeHandler() {
		setInputValue(event.target.value);
	}
	function TextareaChangeHandler() {
		setTextareaValue(event.target.value);
	}
	function changeNewCategoryInputHandler(event) {
		setNewCategoryInput(event.target.value);
	}
	function ResetModal() {
		if (title == "ADD NEW TODO") {
			setInputValue("");
			setSelectedCategory("NoCategory");
			setTextareaValue("");
			setNewCategoryInput("");
		}
		setRequireField("text-xs text-red-600 ml-2 hidden");
		setNewCategoryModalClass("hidden");
		setUniqueCategoryClass("hidden");
		CloseModal();
	}
	//Add new Todo
	let [requireField, setRequireField] = useState(
		"text-xs text-red-600 ml-2 hidden",
	);
	let [errorText, setErrorText] = useState("");
	let [todos, setTodos] = useLocalStorage("todos", []);
	function AddNewTodo() {
		let isUnique = true;
		if (title == "ADD NEW TODO") {
			//Check the todo is Unique
			for (const todo of todos) {
				if (inputValue == todo.title) {
					isUnique = false;
				}
			}
			//Add todo
			if (inputValue != "" && inputValue != " " && isUnique) {
				let time = new Date();
				const newTodo = {
					id: uuidv4(),
					title: inputValue,
					category: selectedCategory,
					description: textareaValue ? textareaValue.trim() : "",
					time:
						time.getFullYear() +
						"/" +
						(time.getMonth() + 1) +
						"/" +
						time.getDate() +
						" - " +
						time.getHours() +
						":" +
						time.getMinutes() +
						":" +
						time.getSeconds(),
					checked: false,
				};
				ResetModal();
				setUserSelectedCategory(newTodo.category);
				if (todos) {
					setTodos([...todos, newTodo]);
				} else {
					setTodos([newTodo]);
				}
			} else {
				if ((inputValue == "" || inputValue == " ") && !isUnique) {
					setErrorText(
						"This field is required and you have already the same todo.",
					);
				} else if (inputValue == "" || inputValue == " ") {
					setErrorText("This field is required.");
				} else if (!isUnique) {
					setErrorText("You have already the same todo.");
				}
				setRequireField("text-xs text-red-600 ml-2 block");
			}
		} else if (title == "EDIT TODO") {
			for (const todo of todos) {
				if (inputValue == todo.title && inputValue != previousTilte) {
					isUnique = false;
				}
			}
			if (inputValue != "" && inputValue != " " && isUnique) {
				let time = new Date();
				const newTodo = {
					id: uuidv4(),
					title: inputValue,
					category: selectedCategory,
					description: textareaValue ? textareaValue.trim() : "",
					time:
						time.getFullYear() +
						"/" +
						(time.getMonth() + 1) +
						"/" +
						time.getDate() +
						" - " +
						time.getHours() +
						":" +
						time.getMinutes() +
						":" +
						time.getSeconds(),
					checked: false,
				};
				ResetModal();
				setUserSelectedCategory(newTodo.category);
				let updatedTodos = todos.map((todo) => {
					if (todo.title == previousTilte) {
						return newTodo;
					}
					return todo;
				});
				setTodos(updatedTodos);
			} else {
				if ((inputValue == "" || inputValue == " ") && !isUnique) {
					setErrorText(
						"This field is required and you have already the same todo.",
					);
				} else if (inputValue == "" || inputValue == " ") {
					setErrorText("This field is required.");
				} else if (!isUnique) {
					setErrorText("You have already the same todo.");
				}
				setRequireField("text-xs text-red-600 ml-2 block");
			}
		}
	}
	//Open add new category modal
	function openNewCategoryModal() {
		setNewCategoryModalClass(
			"absolute w-full h-full top-0 flex items-center justify-center backdrop-blur-xs rounded-lg",
		);
	}
	function ResetNewCategoryModal() {
		AddCategoryClickHandler();
		setNewCategoryModalClass("hidden");
		setUniqueCategoryClass("hidden");
		setNewCategoryInput("");
	}
	return (
		<div className="relative">
			<div className="z-50 w-75 sm:w-85 md:w-120 p-4 h-96 bg-white dark:bg-neutral-950 rounded-lg flex flex-col gap-8 border border-dark dark:border-none shadow-lg shadow-gray-500 dark:shadow-sm dark:shadow-white">
				<div
					className="absolute right-4 top-2 text-rose-800 text-4xl cursor-pointer"
					onClick={ResetModal}
				>
					×
				</div>
				<p className="w-full text-center text-xl xl:text-2xl text-black dark:text-white font-light">
					{title}
				</p>
				<form onSubmit={(e) => e.preventDefault()} className="space-y-3">
					<div className="flex gap-2">
						<div className="flex flex-col text-black dark:text-white w-full">
							<p className="ml-1">Title</p>
							<input
								type="text"
								name="Title"
								className="bg-white text-black w-full rounded-xl px-2 py-0.5 border border-slate-700"
								value={inputValue}
								onChange={InputChangeHandler}
								required
							/>
							<p className={requireField}>{errorText}</p>
						</div>
						<div className="flex flex-col text-black dark:text-white">
							<p>Category</p>
							<select
								name="Category"
								className="bg-white text-black px-2 py-1 rounded-lg w-36 text-sm border border-slate-700"
								value={selectedCategory}
								onChange={SelectChangeHandler}
							>
								<option value="NoCategory">No Category</option>
								{Categories()}
								<option
									name="new"
									onClick={openNewCategoryModal}
									className="text-dark"
								>
									+New category
								</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col gap-0.5 text-black dark:text-white w-full">
						<p className="ml-1">Description</p>
						<textarea
							value={textareaValue}
							onChange={TextareaChangeHandler}
							className="bg-white text-black w-full rounded-lg px-2 py-0.5 resize-none h-26 border border-slate-700"
						/>
					</div>
				</form>
				<button
					className="w-full text-2xl rounded-4xl h-10 bg-primary hover:bg-middle hover:ring-4 ring-offset-0 ring-primary cursor-pointer"
					onClick={AddNewTodo}
				>
					{buttonText}
				</button>
			</div>
			<div className={newCategoryModalClass}>
				<div className="px-2.5 py-4 bg-white dark:bg-neutral-950 rounded-lg flex flex-col gap-4 border border-dark dark:border-none shadow-lg shadow-gray-500 dark:shadow-sm dark:shadow-white items-center justify-center w-65">
					<div className="relative w-full flex items-center justify-center">
						<div
							className="absolute right-1.5 mb-4 text-rose-800 text-3xl cursor-pointer"
							onClick={ResetNewCategoryModal}
						>
							×
						</div>
						<p className="text-sm text-black dark:text-white">
							ADD NEW CATEGORY
						</p>
					</div>
					<div className="w-full flex justify-between items-center">
						<div className="flex flex-col w-4/5">
							<input
								type="text"
								name="New category"
								className="bg-white text-black rounded-lg overflow-hidden px-2 py-0.5 border border-slate-700 h-8"
								onChange={changeNewCategoryInputHandler}
								value={newCategoryInput}
							/>
							<p className={UniqueCategoryClass}>
								You have already this category.
							</p>
						</div>
						<button
							className="flex items-center justify-center cursor-pointer hover:bg-middle hover:ring-4 ring-offset-0 ring-primary bg-primary text-white transition-all duration-300 rounded-full w-10 h-10"
							onClick={AddCategoryClickHandler}
						>
							<svg
								width="30px"
								height="30px"
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
					</div>
				</div>
			</div>
		</div>
	);
}
