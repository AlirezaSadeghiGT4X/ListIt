import Categories from "./Categories";
import Todos from "./Todos";

export default function Main() {
	return (
		<div className="static w-full flex flex-col flex-1 dark:bg-neutral-900 pt-4 px-6 text-white">
			<Categories />
			<div className="w-full flex items-center justify-center flex-1">
				<Todos />
			</div>
		</div>
	);
}
