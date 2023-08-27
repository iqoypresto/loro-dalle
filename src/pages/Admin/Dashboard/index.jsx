import { AdminNavbar } from "../../../components"
import { FaBars, FaSearch } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import Profile from "../../../assets/profile.png"
import { MdKeyboardArrowDown } from "react-icons/md"

export const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSideNavbar, setIsSideNavbar] = useState(true)
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    const toggleSideNavbar = () => {
        setIsSideNavbar(!isSideNavbar)
    }
    return (
        <div className="flex">
            <span className={`relative ${isSideNavbar ? "" : "hidden"}`}>
                <button className=" bg-white rounded-full fixed z-50 top-1/2 left-60 md:hidden p-1" onClick={toggleSideNavbar}><IoIosArrowBack size={20} /></button>
                <AdminNavbar />
            </span>
            <div className="admin-content">
                <div className="mb-10 flex flex-wrap items-center justify-between w-full ">
                    <div className="flex items-center">
                        <button className="p-3 rounded-full hover:bg-gray-100" onClick={toggleSideNavbar}>
                            <FaBars size={18} />
                        </button>
                        <span className="relative flex items-center ms-3 border rounded-md bg-gray-200 h-9 w-full px-5">
                            <input type="text" className="bg-transparent outline-none w-full" placeholder="Search..." />
                            <button className="absolute right-4">
                                <FaSearch />
                            </button>
                        </span>
                    </div>
                    <div className="relative">
                        <button className="flex items-center py-3 px-2" onClick={handleClick}>
                            <img src={Profile} alt="" width={35} height={35} />
                            <p className="ms-2 me-5 text-sm font-semibold text-teal-900">Bapak Rafli</p>
                            <MdKeyboardArrowDown />
                        </button>
                        <NavLink className={`absolute right-0 p-3 border drop-shadow hover:bg-gray-100 ${isOpen ? "" : "hidden"}`} to="/" replace="true">Log Out</NavLink>
                    </div>
                </div>
                <h4 className="text-teal-800 font-bold">DASHBOARD</h4>
                <p className="text-teal-800 mb-5">Selamat datang di dashboard!</p>
                <div className="grid grid-cols-6 gap-5">
                    <div className="border rounded-xl col-start-1 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">525</h5>
                            <div className="flex justify-between">
                                <p>+5%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-2 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Penukaran Sampah</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">1250</h5>
                            <div className="flex justify-between">
                                <p>+10%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl row-span-2 col-start-3 col-end-7 p-5 items-center flex admin-card">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam illo dolorum debitis officia vel repudiandae perferendis enim aspernatur? Obcaecati nostrum esse rerum unde distinctio? Porro neque voluptatem sunt quis qui similique accusamus architecto rerum. Delectus ex quibusdam ducimus fugiat iure accusamus quaerat, deserunt nesciunt harum, aut sit! Pariatur dolores ea, adipisci ullam quaerat nulla quam totam rerum voluptatibus aliquam amet, labore eaque, deserunt excepturi vero. Labore numquam ipsa similique dolorem voluptatum perspiciatis commodi saepe possimus ex eligendi sit provident quos, ad quo at in maxime quas, optio placeat molestiae error voluptate autem. Suscipit illo culpa pariatur enim nobis? Laudantium, molestias.
                    </div>
                    <div className="border rounded-xl col-start-1 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">525</h5>
                            <div className="flex justify-between">
                                <p>+5%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-2 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">525</h5>
                            <div className="flex justify-between">
                                <p>+5%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}