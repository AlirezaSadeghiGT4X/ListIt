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
				<span className="text-gray-700 dark:text-gray-300 text-xs">
					{info.getValue()}
				</span>
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
