import { useLocalStorage } from "usehooks-ts";
import AddTodo from "./AddTodo";
import Empty from "./Empty";
import TodoList from "./TodoList";

export default function Todos({ selectedCategory, setSelectedCategory }) {
	const [data, setValue, removeValue] = useLocalStorage("todos", []);
	let todos = data;
	return (
		<div className="relative w-full">
			{todos == null || todos == undefined || todos == "" ? (
				<div className="mb-36">
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
