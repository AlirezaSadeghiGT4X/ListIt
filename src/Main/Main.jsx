import { useLocalStorage } from "usehooks-ts";
import Categories from "./Categories";
import Todos from "./Todos";

export default function Main() {
	let [selectedCategory, setSelectedCategory] = useLocalStorage(
		"selectedCategory",
		"All",
		
	);
	return (
		<div className="static w-full flex flex-col flex-1 dark:bg-neutral-900 pt-4 px-6 text-white">
			<Categories
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<div className="w-full flex justify-center flex-1">
				<Todos
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			</div>
		</div>
	);
}
