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
            <p>No task in this category.</p>
            <p>Use + to add one</p>
		</div>
	);
}
