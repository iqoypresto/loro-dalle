import { AdminNavbar } from "../../../components"
import { BiEdit, BiTrash } from "react-icons/bi"
import { FaCheck, FaTimes, FaBars, FaSearch } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import Profile from "../../../assets/profile.png"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const BASE_URL = 'https://brave-pike-sheath-dress.cyclic.app';

export const UserSection = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSideNavbar, setIsSideNavbar] = useState(true)
    const [confirmatedUser, setConfirmatedUser] = useState([]);
    const [unconfirmatedUser, setUnconfirmatedUser] = useState([]);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    
    const toggleSideNavbar = () => {
        setIsSideNavbar(!isSideNavbar)
    }

    function handleLogOut() {
        Cookies.remove('auth')
    }

    useEffect(() => {
        const accessToken = Cookies.get('auth');
        axios({
            method: 'GET',
            url: `${BASE_URL}/users`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then((response) => {
            setConfirmatedUser(response.data.data.confirmated_users)
            setUnconfirmatedUser(response.data.data.unconfirmated_users)
        }).catch((error) => {
            // HANDLE ERROR
            console.log(error);
        },)
    }, []);

    return (
        <div className="flex">
            <span className={`relative ${isSideNavbar ? "" : "hidden"}`}>
                <button className=" bg-white rounded-full fixed z-50 top-1/2 left-60 lg:hidden p-1" onClick={toggleSideNavbar}><IoIosArrowBack size={20} /></button>
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
                        <NavLink onClick={handleLogOut} className={`absolute right-0 p-3 border drop-shadow hover:bg-gray-100 ${isOpen ? "" : "hidden"}`} to="/" replace="true">Log Out</NavLink>
                    </div>
                </div>
                <div className="border-b-2 border-b-teal-700 pb-10 mb-8 w-full">
                    <h4 className="text-teal-800 font-bold">ACC USERS</h4>
                    <p className="text-teal-800 mb-10">List of Users Request</p>
                    <div className="overflow-x-scroll">
                        <table className="table-auto border w-full">
                            <thead>
                                <tr>
                                    <th className="text-start p-3">ID</th>
                                    <th className="text-start p-3">Nama</th>
                                    <th className="text-start p-3">Email</th>
                                    <th className="text-start p-3">No. Telepon</th>
                                    <th className="text-start p-3">Alamat</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {unconfirmatedUser.length > 0 && unconfirmatedUser.map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-3">{user.id}</td>
                                        <td className="p-3">{user.fullname}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.phone_number}</td>
                                        <td className="p-3">{user.address}</td>
                                        <td className="p-3">
                                            <div className="flex">
                                                <NavLink><FaCheck className="me-3" size={20} color="green" /></NavLink>
                                                <NavLink><FaTimes size={20} color="red" /></NavLink>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h4 className="text-teal-800 font-bold">USERS</h4>
                    <p className="text-teal-800 mb-10">List of Users</p>
                    <div className="overflow-x-scroll">
                        <table className="table-auto border w-full">
                            <thead>
                                <tr>
                                    <th className="text-start p-3">ID</th>
                                    <th className="text-start p-3">Nama</th>
                                    <th className="text-start p-3">Email</th>
                                    <th className="text-start p-3">No. Telepon</th>
                                    <th className="text-start p-3">Alamat</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {confirmatedUser.length > 0 && confirmatedUser.map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-3">{user.id}</td>
                                        <td className="p-3">{user.fullname}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.phone_number}</td>
                                        <td className="p-3">{user.address}</td>
                                        <td className="p-3">
                                            <div className="flex">
                                                <NavLink><BiEdit className="me-3" size={20} /></NavLink>
                                                <NavLink><BiTrash size={20} color="red" /></NavLink>
                                            </div>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}