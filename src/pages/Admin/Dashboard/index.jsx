import { AdminNavbar } from "../../../components"
import { FaBars, FaSearch } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import Profile from "../../../assets/profile.png"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const BASE_URL = 'https://brave-pike-sheath-dress.cyclic.app';

export const AdminDashboard = () => {
    const [data, setData] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isSideNavbar, setIsSideNavbar] = useState(true)
    const [isLoad, setIsLoad] = useState(false)
    const navigate = useNavigate();

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
            url: `${BASE_URL}/admins/dashboard-data`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then((response) => {
            setData(response.data.data)
            setIsLoad(true)
        }).catch((error) => {
            // HANDLE ERROR
            if (error.response.status === 403 || error.response.status === 401) {
                navigate('/dashboard')
            }
        },)
    }, [])

    return (
        <div>
        { isLoad ? (
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
                        <NavLink onClick={handleLogOut} className={`absolute right-0 p-3 border drop-shadow hover:bg-gray-100 ${isOpen ? "" : "hidden"}`} to="/" replace="true">Log Out</NavLink>
                    </div>
                </div>
                <h4 className="text-teal-800 font-bold">DASHBOARD</h4>
                <p className="text-teal-800 mb-5">Selamat datang di dashboard!</p>
                <div className="grid md:grid-cols-4 gap-5">
                    <div className="border rounded-xl col-start-1 p-5 items-top flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Penukaran Sampah</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">{data.total_transactions | 0}</h5>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-1 md:col-start-2 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Penukaran Bulan Ini</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">{data.current_month_transactions | 0}</h5>
                            <div className="flex justify-between">
                                <p>{data.monthly_rate >= 0 ? '+' : ''}{data.monthly_rate | 0}%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-1 md:col-start-3 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Penukaran Minggu Ini</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">{data.current_week_transactions | 0}</h5>
                            <div className="flex justify-between">
                                <p>{data.weekly_rate >= 0 ? '+' : ''}{data.weekly_rate | 0}%</p>
                                <p>Sejak minggu lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-1 md:col-start-4 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">{data.total_users | 0}</h5>
                            <div className="flex justify-between">
                                <p>+{data.current_month_users | 0}</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (<div></div>)}
        </div>
    )
}