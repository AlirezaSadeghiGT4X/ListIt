import Header from "./Header/Header";
import Main from "./Main/Main";

export default function App() {
	return (
		<div className="flex flex-col h-screen xl:overflow-hidden">
			<Header />
			<Main />
		</div>
	);
}
