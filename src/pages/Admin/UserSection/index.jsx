import { AdminNavbar } from "../../../components"
import { BiEdit, BiTrash } from "react-icons/bi"
import { FaCheck, FaTimes, FaBars, FaSearch } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import Profile from "../../../assets/profile.png"
import { MdKeyboardArrowDown } from "react-icons/md"

export const UserSection = () => {
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
            <span className={isSideNavbar ? "" : "hidden"}>
                <AdminNavbar />
            </span>
            <div className="admin-content">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center">
                        <button className="p-3 rounded-full hover:bg-gray-100" onClick={toggleSideNavbar}>
                            <FaBars size={18}  />
                        </button>
                        <span className="relative flex items-center ms-3 border rounded-md bg-gray-200 h-9 w-72 px-5            ">
                            <input type="text" className="bg-transparent outline-none" placeholder="Search..." />
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
                <div className="border-b-2 border-b-teal-700 pb-10 mb-8">
                    <h4 className="text-teal-800 font-bold">ACC USERS</h4>
                    <p className="text-teal-800 mb-10">List of Users Request</p>
                    <table className="table-auto border w-full">
                        <thead>
                            <tr>
                                <th className="text-start py-3 px-2">ID</th>
                                <th className="text-start">Nama</th>
                                <th className="text-start">Email</th>
                                <th className="text-start">No. Telepon</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><FaCheck className="me-3" size={20} color="green" /></Link>
                                    <Link><FaTimes size={20} color="red" /></Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h4 className="text-teal-800 font-bold">USERS</h4>
                    <p className="text-teal-800 mb-10">List of Users</p>
                    <table className="table-auto border w-full">
                        <thead>
                            <tr>
                                <th className="text-start py-3 px-2">ID</th>
                                <th className="text-start">Nama</th>
                                <th className="text-start">Email</th>
                                <th className="text-start">No. Telepon</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-2">1</td>
                                <td>Muhammad Rifqi Maulana</td>
                                <td>rfqimaulana888@gmail.com</td>
                                <td>083149606671</td>
                                <td className="flex items-center py-3">
                                    <Link><BiEdit className="me-3" size={20} /></Link>
                                    <Link><BiTrash size={20} color="red" /></Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}