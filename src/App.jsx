import Header from "./Header/Header";
import Main from "./Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Footer from "./Footer/Footer";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<div className="relative flex flex-col h-screen overflow-hidden">
							<Header />
							<Main />
							<Footer />
						</div>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}
