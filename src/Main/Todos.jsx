/* eslint-disable react-hooks/set-state-in-effect */
import { useLocalStorage } from "usehooks-ts";
import AddTodo from "./AddTodo";
import Empty from "./Empty";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";

export default function Todos({ selectedCategory, setSelectedCategory }) {
	const [data, setValue, removeValue] = useLocalStorage("todos", []);
	let todos = data;
	let [status, setStatus] = useState(null);
	let [categoryStatus, setCategoryStatus] = useState(null);
	useEffect(() => {
		setCategoryStatus(null);
		for (const todo of todos) {
			if (todo.category == selectedCategory) {
				setCategoryStatus(true);
				break;
			}
		}
		if (todos.length > 0 && categoryStatus != null) {
			setStatus(true);
		} else if (
			selectedCategory == undefined &&
			todos != undefined &&
			status != true
		) {
			setStatus(true);
		} else if (
			selectedCategory == "All" &&
			todos != null &&
			todos != undefined &&
			todos.length >= 1
		) {
			setStatus(true);
		} else {
			setStatus(null);
		}
	}, [categoryStatus, data, selectedCategory, status, todos]);
	return (
		<div className="w-full">
			{status != true ? (
				<div>
					<Empty />
				</div>
			) : (
				<div className="flex justify-center flex-1 h-full">
					<TodoList
						data={data}
						setValue={setValue}
						removeValue={removeValue}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
				</div>
			)}
			<AddTodo
				data={data}
				setValue={setValue}
				removeValue={removeValue}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
		</div>
	);
}
