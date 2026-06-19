import AddTodo from "./AddTodo";
import Empty from "./Empty";

export default function Todos() {
	let todos = localStorage.getItem("todos");
	return (
		<div className="relative w-full">
			{todos == null || todos == undefined || todos == "" ? (
				<div className="mb-36">
					<Empty />
				</div>
			) : (
				<></>
			)}
			<AddTodo />
		</div>
	);
}
