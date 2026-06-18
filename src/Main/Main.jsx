import Categories from "./Categories";
import Todos from "./Todos";

export default function Main() {
	return (
		<div className="w-full flex flex-col flex-1 dark:bg-neutral-900 pt-4 px-6 text-white">
			<Categories />
			<div className="w-full h-fit flex items-center justify-center">
				<Todos />
			</div>
		</div>
	);
}
