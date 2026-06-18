import Empty from "./Empty";

export default function Todos() {
	let todos = localStorage.getItem("todos");
	return (
		<div>
			{todos == null || todos == undefined || todos == "" ? (
				<div className="mb-36">
					<Empty />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
