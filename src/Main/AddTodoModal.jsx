import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddTodoModal({ CloseModal }) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	let categories = localStorage.getItem("categories").split(",");
	let [selectedCategory, setSelectedCategory] = useState("NoCategory");
	let [inputValue, setInputValue] = useState("");
	let [textareaValue, setTextareaValue] = useState("");
	function AddCategoryClickHandler() {
		let newCategory = prompt("Enter your new category name : ");
		if (newCategory) {
			let newCategories = "";
			for (let i = 0; i < categories.length; i++) {
				newCategories = newCategories + categories[i] + ",";
			}
			newCategories = newCategories + newCategory;
			localStorage.setItem("categories", newCategories);
			Categories();
			forceUpdate();
			setSelectedCategory(newCategory);
		}
	}
	//Render Categories in select
	function Categories() {
		let cs = localStorage.getItem("categories").split(",");
		return cs.map((category, index) => {
			if (category != "All") {
				return (
					<option value={category} key={index}>
						{category}
					</option>
				);
			}
			return null;
		});
	}
	//Reset Modal for use again
	function SelectChangeHandler() {
		setSelectedCategory(event.target.value);
	}
	function InputChangeHandler() {
		setInputValue(event.target.value);
	}
	function TextareaChangeHandler() {
		setTextareaValue(event.target.value);
	}
	function ResetModal() {
		setInputValue("");
		setSelectedCategory("NoCategory");
		setTextareaValue("");
		CloseModal();
	}
	//Add new Todo
	function AddNewTodo() {
		ResetModal();
		let todos = JSON.parse(localStorage.getItem("todos")) || [];
		let time = new Date();
		const newTodo = {
			id: uuidv4(),
			title: inputValue,
			category: selectedCategory,
			description: textareaValue,
			time:
				time.getFullYear() +
				"/" +
				(time.getMonth() + 1) +
				"/" +
				time.getDay() +
				" - " +
				time.getHours() +
				":" +
				time.getMinutes() +
				":" +
				time.getSeconds(),
		};
		console.log(newTodo);
		if (todos) {
			todos.push(newTodo);
		} else {
			todos = { newTodo };
		}
		localStorage.setItem("todos", JSON.stringify(todos));
	}
	return (
		<div className="relative">
			<div className="w-80 md:w-120 p-4 h-96 bg-white dark:bg-neutral-950 rounded-lg flex flex-col gap-8 border border-dark dark:border-none">
				<div
					className="absolute right-4 top-2 text-rose-700 text-4xl cursor-pointer"
					onClick={ResetModal}
				>
					×
				</div>
				<p className="w-full text-center text-xl xl:text-2xl text-black dark:text-white">
					ADD NEW TODO
				</p>
				<form className="space-y-3">
					<div className="flex gap-2">
						<div className="flex flex-col text-black dark:text-white w-full">
							<p className="ml-1">Title</p>
							<input
								type="text"
								name="Title"
								className="bg-white text-black w-full rounded-xl px-2 py-0.5 border border-slate-700"
								value={inputValue}
								onChange={InputChangeHandler}
							/>
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
									onClick={AddCategoryClickHandler}
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
					Add
				</button>
			</div>
		</div>
	);
}
