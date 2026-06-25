/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/incompatible-library */
import {
	getCoreRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table";
import { useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function TodoList({ data, setValue, removeValue }) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	let [selectedCategory, setSelectedCategory] = useLocalStorage(
		"selectedCategory",
		"All",
	);
	let [newTodos, setNewTodos] = useState([]);

	useEffect(() => {
		if (selectedCategory === "All") {
			setNewTodos(data);
		} else {
			const filtered = data.filter(
				(item) => item.category === selectedCategory,
			);
			setNewTodos(filtered);
		}
	}, [data, selectedCategory]);
	//Check, change, set todo status
	function CheckboxClickHandler(event) {
		const updatedData = data.map((aData) => {
			if (event.target.id === aData.title) {
				return { ...aData, checked: !aData.checked };
			}
			return aData;
		});
		setValue(updatedData);
		setTodoStatus();
	}
	//Set trough-line or no for todos
	function setTodoStatus(todo) {
		if (!todo.checked) {
			return "dark:hover:bg-neutral-700 hover:bg-neutral-200 transition-colors duration-200";
		}
		return "dark:hover:bg-neutral-700 hover:bg-neutral-200 transition-colors duration-200 line-through decoration-2 decoration-amber-300";
	}
	//Delete todo
	function DeleteTodo(event) {
		setValue(data.filter((aData) => aData.time != event));
	}
	const columns = [
		{
			accessorKey: "title",
			header: "Title",
			cell: (info) => (
				<div className="flex gap-2 items-center">
					<span>
						<input
							type="checkbox"
							name="Checked"
							onChange={CheckboxClickHandler}
							className="accent-light cursor-pointer"
							id={info.getValue()}
							checked={
								data.find((d) => d.title === info.getValue())?.checked ?? false
							}
						/>
					</span>
					<span className="font-medium text-black dark:text-white">
						{info.getValue()}
					</span>
				</div>
			),
		},
		{
			accessorKey: "category",
			header: "Category",
			cell: (info) => (
				<span className="px-2 py-1 text-xs font-semibold text-black bg-light rounded-full">
					{info.getValue()}
				</span>
			),
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: (info) => (
				<span className="text-gray-700 dark:text-gray-300 text-sm">
					{info.getValue()}
				</span>
			),
		},
		{
			accessorKey: "time",
			header: "Time added",
			cell: (info) => (
				<div className="flex md:gap-3 lg:gap-6 xl:gap-11 items-center relative">
					<span className="text-gray-700 dark:text-gray-300 text-xs">
						{info.getValue()}
					</span>
					<span
						className="md:w-3.5 lg:w-5 cursor-pointer absolute lg:left-36 md:left-32 xl:left-40"
						onClick={() => DeleteTodo(info.getValue())}
					>
						<svg
							viewBox="-3 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
							fill="#000000"
							id={info.getValue()}
						>
							<g id="SVGRepo_bgCarrier" stroke-xdth="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<title>trash</title> <desc>Created with Sketch Beta.</desc>{" "}
								<defs> </defs>{" "}
								<g
									id="Page-1"
									stroke="none"
									strokeWidth="1"
									fill="none"
									fillRule="evenodd"
									sketch:type="MSPage"
								>
									{" "}
									<g
										id="Icon-Set"
										sketch:type="MSLayerGroup"
										transform="translate(-259.000000, -203.000000)"
										fill="#f20707"
									>
										{" "}
										<path
											d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z"
											id="trash"
											sketch:type="MSShapeGroup"
										>
											{" "}
										</path>{" "}
									</g>{" "}
								</g>{" "}
							</g>
						</svg>
					</span>
				</div>
			),
		},
	];

	const table = useReactTable({
		data: newTodos,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<div className="max-w-6xl mx-auto hidden md:block">
				<div className="overflow-hidden bg-white dark:bg-neutral-800 rounded-xl border border-dark mt-6">
					<div className="overflow-x-auto max-h-98">
						<table className="w-full text-left table-fixed border-collapse">
							<thead className="bg-gray-50 dark:bg-neutral-800">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id} className="border-b border-gray-200">
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												className="px-6 py-4 text-sm font-semibold text-black dark:text-white"
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody className="divide-y divide-gray-100">
								{table.getRowModel().rows.map((row) => (
									<tr key={row.id} className={setTodoStatus(row.original)}>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id} className="px-6 py-4 text-gray-700">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="md:hidden">
				<div>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	);
}
