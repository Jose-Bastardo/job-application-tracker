import logo from '../assets/logo.png'

function Navbar() {

    return (
        <div className="w-full h-22 bg-[#FFFFFF] border-[#E5E7EB] flex flex-row py-6 text-3xl place-items-center font-semibold shadow-md">
            <div className="flex flex-row h-full border-r border-[#E5E7EB] px-10 space-x-4 place-items-center">
                <img src={logo} alt="Job Tracker Logo" className="bg-[#2563EB] p-2.5 rounded-lg h-full"/>
                <h1>JobTracker</h1>
            </div>
            <div className="text-3xl px-10">
                <h1>Job Application Tracker</h1>
            </div>
        </div>
    );
}

export default Navbar;