import AddTodo from "./AddTodo";
import Empty from "./Empty";
import TodoList from "./TodoList";

export default function Todos() {
	let todos = localStorage.getItem("todos");
	return (
		<div className="relative w-full">
			{todos == null || todos == undefined || todos == "" ? (
				<div className="mb-36">
					<Empty />
				</div>
			) : (
				<div className="flex items-center justify-center flex-1 h-full">
					<TodoList />
				</div>
			)}
			<AddTodo />
		</div>
	);
}
