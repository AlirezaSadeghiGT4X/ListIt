import DarkLightMode from "./DarkLightMode";
import Logo from "./Logo";

export default function Header() {
	return (
		<header className="px-4 py-2 flex justify-between items-center dark:bg-neutral-900">
			<Logo />
			<DarkLightMode />
		</header>
	);
}
