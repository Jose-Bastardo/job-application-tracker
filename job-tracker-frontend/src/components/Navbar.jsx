import logo from '../assets/logo.png'

function Navbar() {

    return (
        <div className="w-full md:h-22 bg-[#FFFFFF] border-[#E5E7EB] flex flex-row flex-wrap md:flex-nowrap py-6 space-y-4 md:space-y-0 text-3xl justify-center place-items-center font-semibold shadow-md">
            <div className="flex flex-row w-full md:w-auto md:border-r border-[#E5E7EB] md:px-10 space-x-4 text-center justify-center place-items-center">
                <img src={logo} alt="Job Tracker Logo" className="bg-[#2563EB] p-2.5 rounded-lg h-12"/>
                <h1>JobTracker</h1>
            </div>
            <div className="text-3xl w-full md:px-10 justify-center md:text-left text-center">
                <h1>Job Application Tracker</h1>
            </div>
        </div>
    );
}

export default Navbar;