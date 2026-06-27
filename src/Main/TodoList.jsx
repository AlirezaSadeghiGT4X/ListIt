/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable no-unused-vars */
import {
	getCoreRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table";
import { useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import TodoModal from "./TodoModal";

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
	const audio = () => {
		const audio = new Audio("/public/Audios/Checkbox.mp3");
		audio.volume = 1;
		audio.play();
	};
	function CheckboxClickHandler(event) {
		if (event.target.checked == true) {
			audio();
		}
		const updatedData = data.map((aData) => {
			if (event.target.id === aData.title) {
				return { ...aData, checked: !aData.checked };
			}
			return aData;
		});
		setValue(updatedData);
		setTodoStatus(event);
	}
	//Set trough-line or no for todos
	function setTodoStatus(todo) {
		if (!todo.checked) {
			return "w-full py-2 px-2 dark:hover:bg-neutral-700 hover:bg-neutral-200 transition-colors duration-200";
		} else {
			return "w-full py-2 px-2 dark:hover:bg-neutral-700 hover:bg-neutral-200 transition-colors duration-200 line-through decoration-2 decoration-amber-300";
		}
	}
	//Delete todo
	function DeleteTodo(event) {
		setValue(data.filter((aData) => aData.time != event));
	}
	//Edit todo
	let [modalStatus, setModalStatus] = useState(
		"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
	);
	let [status, setStatus] = useState(false);
	function ClickHandler() {
		if (status == false) {
			setModalStatus(
				"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setModalStatus(
					"z-50 fixed w-dvw h-dvh flex inset-0 items-center justify-center backdrop-blur-xs pointer-events-auto opcaity-100 scale-100 transition-all",
				);
			}, 1);
			setStatus(true);
		} else if (status == true) {
			setModalStatus(
				"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setModalStatus(
					"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
				);
			}, 1);
			setStatus(false);
		}
	}
	let [newCategoryModalClass, setNewCategoryModalClass] = useState("hidden");
	function HandleCloseModal(event) {
		if (
			event.target.className ===
				"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center backdrop-blur-xs pointer-events-auto opcaity-100 scale-100 transition-all" &&
			newCategoryModalClass === "hidden"
		) {
			setModalStatus(
				"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setModalStatus(
					"z-50 top-0 left-0 fixed w-dvw h-dvh flex inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
				);
			}, 50);
			setStatus(false);
		}
	}
	//Edit todo
	let [previousTilte, setPreviousTilte] = useState("");
	let [previousCategory, setPreviousCategory] = useState("");
	let [previousDescription, setPreviousDescription] = useState("");
	function EditTodo(event) {
		let selectedTodo = data.find((aData) => aData.time == event);
		setPreviousTilte(selectedTodo.title);
		setPreviousCategory(selectedTodo.category);
		setPreviousDescription(selectedTodo.description);
		ClickHandler();
	}
	//Show todo details
	let [showModalStatus, setShowModalStatus] = useState(false);
	let [detailsModalStatus, setDetailsModalStatus] = useState(
		"z-50 w-dvw h-dvh fixed flex top-0 left-0 inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
	);
	let [detailTitleText, setDetailTitleText] = useState("");
	let [detailCategoryText, setDetailCategoryText] = useState("");
	let [detailDescriptionText, setDetailDescriptionText] = useState("");
	let [detailDueText, setDetailDueText] = useState("");
	function ShowTodoDetails(todo) {
		if (showModalStatus == false) {
			setDetailsModalStatus(
				"z-50 w-dvw h-dvh fixed flex top-0 left-0 inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setDetailsModalStatus(
					"z-50 w-dvw h-dvh fixed flex top-0 left-0 inset-0 items-center justify-center backdrop-blur-xs pointer-events-auto opacity-100 scale-100 transition-all",
				);
			}, 1);
			setDetailTitleText(todo.title);
			setDetailCategoryText(todo.category);
			setDetailDueText(todo.time);
			setDetailDescriptionText(todo.description);
			setShowModalStatus(true);
		} else if (showModalStatus == true) {
			setDetailsModalStatus(
				"z-50 w-dvw h-dvh fixed flex top-0 left-0 inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all",
			);
			setTimeout(() => {
				setDetailsModalStatus(
					"z-50 w-dvw h-dvh fixed flex top-0 left-0 inset-0 items-center justify-center pointer-events-none opacity-0 scale-90 backdrop-blur-xs transition-all hidden",
				);
			}, 1);
			setShowModalStatus(false);
		}
	}
	//Reset detail modal to reuse
	function ResetDetailsModal() {
		ShowTodoDetails();
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
						className="md:w-3.5 lg:w-5 cursor-pointer absolute lg:left-36 md:left-30 xl:left-40"
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
					<span
						className="md:w-3.5 lg:w-5 cursor-pointer absolute lg:left-48 md:left-36 xl:left-54"
						onClick={() => {
							EditTodo(info.getValue());
						}}
					>
						<svg
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
									fillRule="evenodd"
									clipRule="evenodd"
									d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
									fill="#17a248"
								></path>{" "}
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
		<div className="w-full">
			<div className="max-w-6xl mx-auto hidden md:block">
				<div className="overflow-hidden bg-white dark:bg-neutral-800 rounded-xl border border-dark mt-6">
					<div className="overflow-x-auto max-h-98">
						<table className="w-full text-left table-fixed border-collapse">
							<thead className="bg-gray-50 dark:bg-neutral-800 sticky top-0 z-10 border-b-2 border-white">
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
			<div className="md:hidden mt-6 border-primary border p-2 rounded-2xl max-h-80 overflow-y-scroll overflow-x-hidden">
				<div className="w-full flex flex-col divide-y divide-gray-400 dark:divide-white">
					{newTodos.map((aData, index) => (
						<div className={setTodoStatus(aData)} key={index}>
							<div className="flex justify-between items-center">
								<div className="flex gap-2 items-center">
									<span>
										<input
											type="checkbox"
											name="Checked"
											onChange={CheckboxClickHandler}
											className="accent-light cursor-pointer"
											id={aData.title}
											checked={
												data.find((d) => d.title === aData.title)?.checked ??
												false
											}
										/>
									</span>
									<span className="italic text-black dark:text-white">
										{index + 1}.
									</span>
									<span className="font-medium text-lg text-black dark:text-white truncate">
										{aData.title}
									</span>
								</div>
								<div className="flex flex-row-reverse items-center gap-2">
									<span
										className="w-4 cursor-pointer"
										onClick={() => DeleteTodo(aData.time)}
									>
										<svg
											viewBox="-3 0 32 32"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
											fill="#000000"
											id={aData.time}
										>
											<g id="SVGRepo_bgCarrier" stroke-xdth="0"></g>
											<g
												id="SVGRepo_tracerCarrier"
												strokeLinecap="round"
												strokeLinejoin="round"
											></g>
											<g id="SVGRepo_iconCarrier">
												{" "}
												<title>trash</title>{" "}
												<desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
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
									<span
										className="w-4 cursor-pointer"
										onClick={() => {
											EditTodo(aData.time);
										}}
									>
										<svg
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
													fillRule="evenodd"
													clipRule="evenodd"
													d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
													fill="#17a248"
												></path>{" "}
											</g>
										</svg>
									</span>
									<span
										className="w-5 cursor-pointer"
										onClick={() => {
											ShowTodoDetails(aData);
										}}
									>
										<svg
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
													d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z"
													className="fill-gray-700 dark:fill-white"
												></path>{" "}
												<path
													d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
													className="fill-gray-700 dark:fill-white"
												></path>{" "}
												<path
													d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z"
													className="fill-gray-700 dark:fill-white"
												></path>{" "}
											</g>
										</svg>
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="right-0 w-full bottom-0">
					<div className={detailsModalStatus}>
						<article className="w-5/6 h-2/3 dark:bg-neutral-950 bg-white p-4 rounded-2xl space-y-4 relative border dark:border-none border-primary shadow-lg shadow-gray-500 dark:shadow-sm dark:shadow-white">
							<p className="w-full text-center font-semibold tracking-wide text-black dark:text-white">
								TODO DETAILS
							</p>
							<div
								className="absolute right-4 top-2 text-rose-800 text-3xl cursor-pointer"
								onClick={ResetDetailsModal}
							>
								×
							</div>
							<div className="flex flex-col h-10/12 justify-between">
								<div className="flex items-center gap-1">
									<p className="font-black dark:text-gray-400 text-gray-700">Title :</p>
									<p className="text-gray-950 dark:text-white">{detailTitleText}</p>
								</div>
								<div className="flex items-center gap-1">
									<p className="font-black dark:text-gray-400 text-gray-700">Category :</p>
									<p className="text-gray-950 dark:text-white">{detailCategoryText}</p>
								</div>
								<div>
									<p className="font-black dark:text-gray-400 text-gray-700">Description :</p>
									<p className="text-xs line-clamp-8 indent-2">
										{detailDescriptionText}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<p className="font-black dark:text-gray-400 text-gray-700">Due :</p>
									<p className="text-gray-950 dark:text-white">{detailDueText}</p>
								</div>
							</div>
						</article>
					</div>
				</div>
			</div>
			<div className={modalStatus}>
				<TodoModal
					CloseModal={ClickHandler}
					data={data}
					setValue={setValue}
					removeValue={removeValue}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					newCategoryModalClass={newCategoryModalClass}
					setNewCategoryModalClass={setNewCategoryModalClass}
					title={"EDIT TODO"}
					previousTilte={previousTilte}
					previousCategory={previousCategory}
					previousDescription={previousDescription}
				/>
			</div>
		</div>
	);
}
