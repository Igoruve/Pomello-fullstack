import { Link } from "react-router-dom";

import HomeNavbar from "../../components/navbar/HomeNavbar";

function Homepage() {

	return (
		<section className="mb-2 bg-gray-600 h-screen py-4">
			<HomeNavbar />
			<section className="flex flex-row mt-40 mx-60 gap-10">
				<div className="flex flex-col *:items-center pt-20 text-white">
					<h1 className="text-4xl font-bold">Focus, organize, and tackle your to-dos in one place.</h1>
					<h2 className="text-2xl pt-4">Like trello, but better!</h2>
					<p className="text-xl pt-4"><span className="font-bold text-[#f56b79]">Pomello </span>is a task manager that helps you stay on top of your to-dos. Organize your tasks into lists and use the chronometer to stay focus on your work. </p>
					<p className="pt-10 text-2xl font-bold text-white">Wanna get <span className="text-[#f56b79]">started?</span></p>
					<Link to="/register">
						<div className="font-bold px-4 py-2 rounded-lg bg-[#f56b79] mt-6 hover:bg-[#f56b79]/80 flex flex-row w-64 shadow-lg items-center justify-center">Register Now</div>
					</Link>
				</div>
				<img src="./home_img.jpg" alt="pomello home" className="w-200" />
			</section>
		</section>
	);
}

export default Homepage;
