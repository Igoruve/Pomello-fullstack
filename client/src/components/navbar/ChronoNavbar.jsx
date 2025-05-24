import Chrono from "../../components/chrono/Chrono.jsx";

function ChronoNavbar() {

    return (
        <nav className="flex flex-col bg-gray-800 border-gray-100 fixed top-16 right-0 h-screen z-50 shadow-lg pb-24 w-64 opacity-90 text-white/80 text-lg px-6 gap-4 pt-6">
            <h1 className="text-xl text-center font-black">FOCUS CHRONO</h1>
            <p>Want to get extra help to focus? Start your pomodoro chrono and work more effectively</p>

            <p>Your chrono is set for <span className="font-bold">25 minutes</span> of work and <span className="font-bold">5 minutes</span> of break</p>
            <Chrono />
        </nav>
    )
}

export default ChronoNavbar;