import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { useState } from "react";

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
                        <div className="profile-notif flex">
                            <li>
                                <Link>
                                    <IoNotificationsOutline size={20} />
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <CgProfile size={48} />
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}