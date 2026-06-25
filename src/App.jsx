import Header from "./Header/Header";
import Main from "./Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<div className="relative flex flex-col h-screen xl:overflow-hidden">
							<Header />
							<Main />
						</div>
					}
				/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</Router>
	);
}
