import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUsers,
  FaCoins,
  FaShoppingBasket,
} from "react-icons/fa";
import { useState } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { GiSwapBag } from "react-icons/gi";
import Profile from "../assets/profile.png";
import { logout } from "../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { FormEditProfile } from "./Form";
import { HashLink } from "react-router-hash-link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  const changeOpacity = () => {
    if (window.scrollY >= 100) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  function handleClick() {
    setIsOpen(!isOpen);
  }

  window.addEventListener("scroll", changeOpacity);
  return (
    <>
      <nav className={isTransparent ? "transparent" : ""}>
        <div className="nav-content">
          <Link to="/">
            <h4>Loro Dalle&apos;</h4>
          </Link>
          <span>
            {isOpen ? (
              <FaTimes className="icon" size={30} onClick={handleClick} />
            ) : (
              <FaBars className="icon" size={30} onClick={handleClick} />
            )}
          </span>
          <ul className={isOpen ? "open" : ""}>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <HashLink to="/dashboard#exchange-history">Transaksi</HashLink> 
            </li>
            <li>
              <Link to="/dashboard" className="last">
                + Tukarkan Sampah
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export function DashboardNavbar(props) {
    const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const dispatch = useDispatch();

  const changeOpacity = () => {
    if (window.scrollY >= 100) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const handleProfileClick = () => {
    setIsProfile(!isProfile);
  };

  function handleLogOut() {
    dispatch(logout());
  }

  function handleProfileSetting() {
    setIsOpenEditUser(true);
  }

  function onCloseEditForm() {
    setIsOpenEditUser(false);
  }

  function onUpdateEditForm() {
    window.location.reload();
  }

  window.addEventListener("scroll", changeOpacity);
  return (
    <div>
        {isOpenEditUser && (
          <FormEditProfile
            data={user}
            onClose={onCloseEditForm}
            onUpdate={onUpdateEditForm}
          />
        )}
      <nav className={isTransparent ? "transparent" : ""}>
        <div className="nav-content">
          <Link to="/">
            <h4>Loro Dalle&apos;</h4>
          </Link>
          <span>
            {isOpen ? (
              <FaTimes className="icon" size={30} onClick={handleClick} />
            ) : (
              <FaBars className="icon" size={30} onClick={handleClick} />
            )}
          </span>
          <ul className={isOpen ? "open" : ""}>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <HashLink to="/dashboard#exchange-history">Transaksi</HashLink>
            </li>
            <div className="profile-notif fleprops">
              <li className="relative">
                <a
                  className="hover:cursor-pointer "
                  onClick={handleProfileClick}
                >
                  <img src={Profile} alt="" width={45} height={45} />
                </a>
                <div
                  className={`profile-setting ${
                    isProfile ? "drop-shadow-2xl z-10" : "hidden"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <img src={Profile} alt="" width={60} height={60} />
                    <h5 className="py-1">{props.fullname}</h5>
                  </div>
                  <div className="menu mt-3 gap-y-2 flex flex-col">
                    <Link onClick={handleProfileSetting} className="py-1">Profile Setting</Link>
                    <Link onClick={handleLogOut} to="/" className="py-1">
                      Log Out
                    </Link>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </ div>
  );
}

export const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <Link to="/admin-dashboard" className="logo">
        LORO DALLE`
      </Link>
      <ul>
        <div className="point">
          <li>
            <NavLink to="/admin-dashboard">
              {" "}
              <LiaHomeSolid size={18} className="me-9" />
              Dashboard
            </NavLink>
          </li>
        </div>
        <div className="point">
          <p className="header">User Facing</p>
          <li>
            <NavLink to="/admin-product-section">
              {" "}
              <FaShoppingBasket size={18} className="me-9" />
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-user-section">
              {" "}
              <FaUsers size={18} className="me-9" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-sampah-section">
              {" "}
              <GiSwapBag size={18} className="me-9" />
              Penukaran
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-point-section">
              {" "}
              <FaCoins size={18} className="me-9" />
              Point
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
};
