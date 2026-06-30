import { useLocalStorage } from "usehooks-ts";
import Categories from "./Categories";
import Todos from "./Todos";

export default function Main() {
	let [selectedCategory, setSelectedCategory] = useLocalStorage(
		"selectedCategory",
		"All",
	);
	return (
		<main className="w-full flex flex-col h-full dark:bg-neutral-900 pt-4 px-2 text-white">
			<Categories
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<div className="w-full flex justify-center">
				<Todos
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			</div>
		</main>
	);
}
