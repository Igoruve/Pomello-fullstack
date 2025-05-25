import { Link } from "react-router-dom";

import HomeNavbar from "../../components/navbar/HomeNavbar";

function Homepage() {
  return (
    <section className="bg-gray-900 h-screen py-24">
      <HomeNavbar />
      <section className="flex flex-col items-center h-full bg-gray-900">
        <h1 className="text-8xl font-bold bg-gradient-to-t from-[#f56b79] via-[#f78a6b] to-[#fcab51] bg-clip-text text-transparent">
          Pomello
        </h1>

        <section className="flex flex-row mt-24 mx-60 gap-24 items-center justify-center">
          <section className="aspect-w-16 aspect-h-9 w-[70%]">
            <img
              src="./home_img.webp"
              alt="pomello home"
              className="object-contain rounded-lg"
            />
          </section>

          <div className="flex flex-col *:items-center text-white">
            <h2 className="text-4xl font-bold">
              Focus, organize and tackle your to-dos in one place.
            </h2>
            <h3 className="text-2xl pt-4">Like trello, but better!</h3>
            <p className="text-xl pt-4">
              <span className="font-bold text-[#f56b79]">Pomello </span>is a
              task manager that helps you stay on top of your to-dos. Organize
              your tasks into lists and use the chronometer to stay focus on
              your work.{" "}
            </p>
            <p className="pt-10 text-2xl font-bold text-white">
              Wanna get <span className="text-[#f56b79]">started?</span>
            </p>
            <Link to="/register">
              <div className="relative group mt-6 w-fit">
                <div className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#f56b79] via-[#f78a6b] to-[#fcab51] text-white font-bold shadow-lg z-10 relative">
                  Register Now
                </div>
                <span className="absolute inset-0 rounded-lg border-8 border-transparent group-hover:border-white animate-border-glow pointer-events-none"></span>
              </div>
            </Link>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Homepage;
