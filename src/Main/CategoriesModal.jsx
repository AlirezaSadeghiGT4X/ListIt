import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function CategoriesModal({
	CloseModal,
	categories,
	setCategories,
	selectedCategory,
	setSelectedCategory,
}) {
	let [todos, setTodos] = useLocalStorage("todos");
	let [newTodos, setNewTodos] = useState([]);
	function DeleteCategory(category) {
		//Delete in categories array
		setCategories(categories.filter((aCatgeory) => aCatgeory != category));
		//Set selected category
		if (selectedCategory == category) {
			setSelectedCategory("All");
		}
		//Update todos array in local storage
		if (todos) {
			todos.map((todo) => {
				if (todo.category != category) {
					setNewTodos([...newTodos, todo]);
				}
			});
			setTodos(newTodos);
		}
	}
	return (
		<div className="max-h-2/3 min-h-3/12 pt-6 w-75 sm:w-85 md:w-100 bg-white dark:bg-neutral-950 rounded-lg border border-dark dark:border-none shadow-lg shadow-gray-500 dark:shadow-sm dark:shadow-white backdrop-blur-2xl overflow-hidden">
			<div className="px-6">
				<div
					className="absolute right-3 top-1 text-rose-800 text-3xl cursor-pointer"
					onClick={CloseModal}
				>
					×
				</div>
				<p className="text-sm md:text-lg text-black dark:text-white mb-4 w-full text-center select-none">
					MANAGE CATEGORIES
				</p>
				{categories.length > 1 ? (
					<ul className="divide-y divide-gray-400 flex flex-col gap-2 overflow-y-scroll pr-4 pl-3 max-h-60 mb-8">
						{categories.map((category, index) => {
							if (category != "All") {
								return (
									<li key={index}>
										<div className="pb-2 flex items-center justify-between">
											<p>
												{index}. {category}
											</p>
											<button
												id={category}
												className="w-4 cursor-pointer"
												onClick={() => DeleteCategory(category)}
											>
												<svg
													viewBox="-3 0 32 32"
													version="1.1"
													xmlns="http://www.w3.org/2000/svg"
													xmlnsXlink="http://www.w3.org/1999/xlink"
													xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
													fill="#000000"
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
														<desc>Created with Sketch Beta.</desc>{" "}
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
											</button>
										</div>
									</li>
								);
							}
						})}
					</ul>
				) : (
					<div className="flex gap-2 items-center mb-10 w-full justify-center">
						<svg
							width="64px"
							height="64px"
							viewBox="0 0 1024 1024"
							class="icon"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							fill="#000000"
						>
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							></g>
							<g id="SVGRepo_iconCarrier">
								<path
									d="M660 103.2l-149.6 76 2.4 1.6-2.4-1.6-157.6-80.8L32 289.6l148.8 85.6v354.4l329.6-175.2 324.8 175.2V375.2L992 284.8z"
									fill="#FFFFFF"
								></path>
								<path
									d="M180.8 737.6c-1.6 0-3.2 0-4-0.8-2.4-1.6-4-4-4-7.2V379.2L28 296c-2.4-0.8-4-4-4-6.4s1.6-5.6 4-7.2l320.8-191.2c2.4-1.6 5.6-1.6 8 0l154.4 79.2L656 96c2.4-1.6 4.8-0.8 7.2 0l332 181.6c2.4 1.6 4 4 4 7.2s-1.6 5.6-4 7.2l-152.8 88v350.4c0 3.2-1.6 5.6-4 7.2-2.4 1.6-5.6 1.6-8 0l-320-174.4-325.6 173.6c-1.6 0.8-2.4 0.8-4 0.8zM48 289.6L184.8 368c2.4 1.6 4 4 4 7.2v341.6l317.6-169.6c2.4-1.6 5.6-1.6 7.2 0l312.8 169.6V375.2c0-3.2 1.6-5.6 4-7.2L976 284.8 659.2 112.8 520 183.2c0 0.8-0.8 0.8-0.8 1.6-2.4 4-7.2 4.8-11.2 2.4l-1.6-1.6h-0.8l-152.8-78.4L48 289.6z"
									fill="#6A576D"
								></path>
								<path
									d="M510.4 179.2l324.8 196v354.4L510.4 554.4z"
									fill="#121519"
								></path>
								<path
									d="M510.4 179.2L180.8 375.2v354.4l329.6-175.2z"
									fill="#121519"
								></path>
								<path
									d="M835.2 737.6c-1.6 0-2.4 0-4-0.8l-324.8-176c-2.4-1.6-4-4-4-7.2V179.2c0-3.2 1.6-5.6 4-7.2 2.4-1.6 5.6-1.6 8 0L839.2 368c2.4 1.6 4 4 4 7.2v355.2c0 3.2-1.6 5.6-4 7.2h-4zM518.4 549.6l308.8 167.2V379.2L518.4 193.6v356z"
									fill="#6A576D"
								></path>
								<path
									d="M180.8 737.6c-1.6 0-3.2 0-4-0.8-2.4-1.6-4-4-4-7.2V375.2c0-3.2 1.6-5.6 4-7.2l329.6-196c2.4-1.6 5.6-1.6 8 0 2.4 1.6 4 4 4 7.2v375.2c0 3.2-1.6 5.6-4 7.2l-329.6 176h-4z m8-358.4v337.6l313.6-167.2V193.6L188.8 379.2z"
									fill="#6A576D"
								></path>
								<path
									d="M510.4 550.4L372 496 180.8 374.4v355.2l329.6 196 324.8-196V374.4L688.8 483.2z"
									fill="#D6AB7F"
								></path>
								<path
									d="M510.4 933.6c-1.6 0-3.2 0-4-0.8L176.8 736.8c-2.4-1.6-4-4-4-7.2V374.4c0-3.2 1.6-5.6 4-7.2 2.4-1.6 5.6-1.6 8 0L376 488.8l135.2 53.6 174.4-66.4L830.4 368c2.4-1.6 5.6-2.4 8-0.8 2.4 1.6 4 4 4 7.2v355.2c0 3.2-1.6 5.6-4 7.2l-324.8 196s-1.6 0.8-3.2 0.8z m-321.6-208l321.6 191.2 316.8-191.2V390.4L693.6 489.6c-0.8 0.8-1.6 0.8-1.6 0.8l-178.4 68c-1.6 0.8-4 0.8-5.6 0L369.6 504c-0.8 0-0.8-0.8-1.6-0.8L188.8 389.6v336z"
									fill="#6A576D"
								></path>
								<path
									d="M510.4 925.6l324.8-196V374.4L665.6 495.2l-155.2 55.2z"
									fill="#121519"
								></path>
								<path
									d="M510.4 933.6c-1.6 0-2.4 0-4-0.8-2.4-1.6-4-4-4-7.2V550.4c0-3.2 2.4-6.4 5.6-7.2L662.4 488l168-120c2.4-1.6 5.6-1.6 8-0.8 2.4 1.6 4 4 4 7.2v355.2c0 3.2-1.6 5.6-4 7.2l-324.8 196s-1.6 0.8-3.2 0.8z m8-377.6v355.2l308.8-185.6V390.4L670.4 501.6c-0.8 0.8-1.6 0.8-1.6 0.8l-150.4 53.6z"
									fill="#6A576D"
								></path>
								<path
									d="M252.8 604l257.6 145.6V550.4l-147.2-49.6-182.4-126.4z"
									fill="#121519"
								></path>
								<path
									d="M32 460l148.8-85.6 329.6 176L352 640.8z"
									fill="#FFFFFF"
								></path>
								<path
									d="M659.2 693.6l176-90.4V375.2L692 480.8l-179.2 68-2.4 1.6z"
									fill="#121519"
								></path>
								<path
									d="M510.4 550.4l148.8 85.6L992 464.8l-156.8-89.6z"
									fill="#FFFFFF"
								></path>
								<path
									d="M352 648.8c-1.6 0-2.4 0-4-0.8l-320-180.8c-2.4-1.6-4-4-4-7.2s1.6-5.6 4-7.2L176.8 368c2.4-1.6 5.6-1.6 8 0l329.6 176c2.4 1.6 4 4 4 7.2s-1.6 5.6-4 7.2L356 648c-0.8 0.8-2.4 0.8-4 0.8zM48 460L352 632l141.6-80.8L180.8 384 48 460z"
									fill="#6A576D"
								></path>
								<path
									d="M659.2 644c-1.6 0-2.4 0-4-0.8L506.4 557.6c-2.4-1.6-4-4-4-7.2s1.6-5.6 4-7.2l324.8-176c2.4-1.6 5.6-1.6 8 0l156.8 90.4c2.4 1.6 4 4 4 7.2s-1.6 5.6-4 7.2L663.2 643.2c-1.6 0.8-2.4 0.8-4 0.8zM527.2 550.4l132.8 76L976 464l-141.6-80-307.2 166.4z"
									fill="#6A576D"
								></path>
							</g>
						</svg>
						<p>Nothing here!</p>
					</div>
				)}
			</div>
			<p className="text-center text-xs absolute bottom-2 w-full ">
				You can add categories when you add a new todo.
			</p>
		</div>
	);
}
