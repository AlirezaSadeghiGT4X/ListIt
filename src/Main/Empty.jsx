export default function Empty() {
	return (
		<div className="flex flex-col items-center justify-center">
			<lottie-player
				autoplay
				loop
				mode="normal"
				src="/public/Animations/NothingHere.json"
				className="md:w-100 w-80"
			></lottie-player>
			<div className="flex flex-col items-center justify-center text-black dark:text-white">
				<p>No tasks in this category.</p>
				<p>Use + to add one</p>
			</div>
		</div>
	);
}
