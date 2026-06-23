import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<section className="w-full flex h-screen justify-between items-center flex-col">
			<lottie-player
				autoplay
				loop
				mode="normal"
				src="/public/Animations/404.json"
				className="xl:w-230 lg:w-200 md:w-175 sm:w-130 w-75"
			></lottie-player>
            <Link to={"/"} className="w-fit bg-primary p-4 text-white rounded-2xl transition-all hover:bg-middle hover:ring-4 ring-dark mb-2">Return Home</Link>
		</section>
	);
}
