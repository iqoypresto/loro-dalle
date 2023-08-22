import { Link, NavLink } from "react-router-dom"
import { FaBars, FaTimes, FaUsers, FaCoins } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { useState } from "react";
import { LiaHomeSolid } from "react-icons/lia"
import { GiSwapBag } from "react-icons/gi"
import { MdKeyboardArrowDown } from "react-icons/md"
import Profile from "../assets/profile.png"

export function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(false)

    const changeOpacity = () => {
        if (window.scrollY >= 100) {
            setIsTransparent(true);
        } else {
            setIsTransparent(false);
        }
    }

    function handleClick() {
        setIsOpen(!isOpen)
    }

    window.addEventListener('scroll', changeOpacity)
    return (
        <>
            <nav className={isTransparent ? "transparent" : ""}>
                <div className="nav-content">
                    <h1>Loro Dalle'</h1>
                    <span>
                        {isOpen ? <FaTimes className="icon" size={30} onClick={handleClick} /> : <FaBars className="icon" size={30} onClick={handleClick} />}

                    </span>
                    <ul className={isOpen ? "open" : ""}>
                        <li>
                            <Link to="/">Beranda</Link>
                        </li>
                        <li>
                            <Link>Transkasi</Link>
                        </li>
                        <li>
                            <Link to="/login" className="last">+ Tukarkan Sampah</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export function DashboardNavbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(false)
    const [isProfile, setIsProfile] = useState(false)

    const changeOpacity = () => {
        if (window.scrollY >= 100) {
            setIsTransparent(true);
        } else {
            setIsTransparent(false);
        }
    }

    function handleClick() {
        setIsOpen(!isOpen)
    }

    const handleProfileClick = () => {
        setIsProfile(!isProfile)
    }

    window.addEventListener('scroll', changeOpacity)
    return (
        <>

            <nav className={isTransparent ? "transparent" : ""}>
                <div className="nav-content">
                    <h1>Loro Dalle'</h1>
                    <span>
                        {isOpen ? <FaTimes className="icon" size={30} onClick={handleClick} /> : <FaBars className="icon" size={30} onClick={handleClick} />}

                    </span>
                    <ul className={isOpen ? "open" : ""}>
                        <li>
                            <Link to="/">Beranda</Link>
                        </li>
                        <li>
                            <Link>Transkasi</Link>
                        </li>
                        <div className="profile-notif flex">
                            <li>
                                <Link>
                                    <IoNotificationsOutline size={20} />
                                </Link>
                            </li>
                            <li className="relative">
                                <a className="hover:cursor-pointer" onClick={handleProfileClick}>
                                    <img src={Profile} alt="" width={45} height={45} />
                                </a>
                                <div className={`profile-setting ${isProfile ? "drop-shadow-2xl z-10" : "hidden"}`}>
                                    <p className="mb-3">Anto Bukanmain</p>
                                    <p className="font-light text-xs">anto@gmail.com</p>
                                    <div className="menu mt-3 gap-y-2 flex flex-col">
                                        <Link className="py-1">Profile Setting</Link>
                                        <Link to="/" className="py-1">Log Out</Link>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export const AdminNavbar = () => {
    return (
        <>
            <div className="admin-navbar">
                <Link to="/admin-dashboard" className="logo">LORO' DALLE</Link>
                <ul>
                    <div className="point">
                        <li>
                            <NavLink to="/admin-dashboard"> <LiaHomeSolid size={18} className="me-9" />Dashboard</NavLink>
                        </li>
                    </div>
                    <div className="point">
                        <p className="header">User Section</p>
                        <li>
                            <NavLink to="/admin-user-section"> <FaUsers size={18} className="me-9" />Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin-sampah-section"> <GiSwapBag size={18} className="me-9" />Penukaran</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin-point-section"> <FaCoins size={18} className="me-9" />Point</NavLink>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export const AdminTopNavbar = () => {
    return (
        <>
            <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center">
                    <FaBars size={18} />
                    <input type="text" className="ms-3 border rounded-md bg-gray-200 h-9 w-72 px-5" placeholder="Search..." />
                </div>
                <button className="flex items-center">
                    <img src={Profile} alt="" width={35} height={35} />
                    <p className="ms-2 me-5 text-sm font-semibold text-teal-900">Bapak Rafli</p>
                    <MdKeyboardArrowDown />
                </button>
            </div>
        </>
    )
}