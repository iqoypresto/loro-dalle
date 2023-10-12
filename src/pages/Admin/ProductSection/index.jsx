import {
  AdminNavbar,
  FormAddProduct,
  FormEditProduct,
  TealButton,
} from "../../../components";
import { FaBars, FaSearch } from "react-icons/fa";
import { BiEdit, BiTrash } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "../../../assets/profile.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import authService from "../../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../constant";
import { logout } from "../../../actions/authAction";

const SwalReact = withReactContent(Swal);

export const ProductSection = () => {
  const { isAdmin, isAuthenticated } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSideNavbar, setIsSideNavbar] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [reloadData, setReloadData] = useState(true);
  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const toggleSideNavbar = () => {
    setIsSideNavbar(!isSideNavbar);
  };

  function handleClickAddProduct() {
    setIsOpenAddProduct(!isOpenAddProduct);
  }

  function handleClickEditProduct(idx) {
    setActiveIdx(idx);
    setIsOpenEditProduct(true);
  }

  function onCloseAddForm() {
    setIsOpenAddProduct(false);
  }

  function onCloseEditForm() {
    setIsOpenEditProduct(false);
  }

  function onUpdateExhange() {
    setReloadData(true);
  }

  function handleLogOut() {
    dispatch(logout());
    navigate("/");
  }

  function handleDeleteProduct(id) {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (!isAdmin) {
      navigate("/dashboard");
    }

    const authHeader = authService.authHeader();
    if (!authHeader) {
      navigate("/login");
    }

    SwalReact.fire({
      title: "Yakin menghapus produk ini?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.value) {
        axios({
          method: "DELETE",
          url: `${BASE_URL}/products/${id}`,
          headers: {
            ...authHeader,
          },
          withCredentials: true,
        })
          .then(() => {
            SwalReact.fire("Sukses!", "Produk berhasil dihapus", "success");
          })
          .catch((error) => {
            if (error.response.status === 403) {
              navigate("/dashboard");
            } else if (error.response.status === 401) {
              dispatch(logout());
              navigate("/login");
            } else {
              SwalReact.fire({
                icon: "error",
                title: "Gagal menghapus produk",
                text: error.response.data.message,
              });
            }
          })
          .finally(() => {
            setReloadData(true);
          });
      }
    });
  }

  useEffect(() => {
    if (reloadData) {
      if (!isAuthenticated) {
        navigate("/login");
      }

      if (!isAdmin) {
        navigate("/dashboard");
      }

      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      setIsLoad(true);

      axios({
        method: "GET",
        url: `${BASE_URL}/products`,
      })
        .then((response) => {
          setProducts(response.data.data.products);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          } else {
            navigate("/");
          }
        })
        .finally(() => {
          setReloadData(false);
        });
    }
  }, [reloadData]);

  return (
    <div>
      {isLoad && (
        <div className="flex">
          {isOpenAddProduct && (
            <FormAddProduct
              onCLose={onCloseAddForm}
              onUpdate={onUpdateExhange}
            />
          )}
          {isOpenEditProduct && (
            <FormEditProduct
              data={products[activeIdx]}
              onClose={onCloseEditForm}
              onUpdate={onUpdateExhange}
            />
          )}
          <span className={`relative ${isSideNavbar ? "" : "hidden"}`}>
            <button
              className=" bg-white rounded-full fixed z-50 top-1/2 left-60 md:hidden p-1"
              onClick={toggleSideNavbar}
            >
              <IoIosArrowBack size={20} />
            </button>
            <AdminNavbar />
          </span>
          <div className="admin-content">
            <div className="mb-10 flex flex-wrap items-center justify-between w-full ">
              <div className="flex items-center">
                <button
                  className="p-3 rounded-full hover:bg-gray-100"
                  onClick={toggleSideNavbar}
                >
                  <FaBars size={18} />
                </button>
                <span className="relative flex items-center ms-3 border rounded-md bg-gray-200 h-9 w-full px-5">
                  <input
                    type="text"
                    className="bg-transparent outline-none w-full"
                    placeholder="Search..."
                  />
                  <button className="absolute right-4">
                    <FaSearch />
                  </button>
                </span>
              </div>
              <div className="relative">
                <button
                  className="flex items-center py-3 px-2"
                  onClick={handleClick}
                >
                  <img src={Profile} alt="" width={35} height={35} />
                  <MdKeyboardArrowDown />
                </button>
                <NavLink
                  onClick={handleLogOut}
                  className={`absolute right-0 p-3 border drop-shadow hover:bg-gray-100 ${
                    isOpen ? "" : "hidden"
                  }`}
                  to="/"
                  replace="true"
                >
                  Log Out
                </NavLink>
              </div>
            </div>
            <h4 className="text-teal-800 font-bold">PRODUCT</h4>
            <p className="text-teal-800 mb-10">List of Product</p>
            <div className="overflow-x-scroll">
              <span onClick={handleClickAddProduct} className="">
                <TealButton name="+ Tambah Produk" />
              </span>
              <table className="table-auto border w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-start p-3">ID</th>
                    <th className="text-start p-3">Nama</th>
                    <th className="text-start p-3">Deskripsi</th>
                    <th className="text-start p-3">Harga (Rp)</th>
                    <th className="text-start p-3">Stok</th>
                    <th className="text-start p-3">Jenis</th>
                    <th className="text-start p-3">Pemilik</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((prod, idx) => (
                      <tr key={prod.id}>
                        <td className="p-3">{prod.id}</td>
                        <td className="p-3">{prod.title}</td>
                        <td className="p-3">{prod.description}</td>
                        <td className="p-3">{prod.price}</td>
                        <td className="p-3">{prod.stock}</td>
                        <td className="p-3">{prod.type}</td>
                        <td className="p-3">{prod.owner}</td>
                        <td className="p-3">
                          <div className="flex">
                            <NavLink
                              onClick={() => handleClickEditProduct(idx)}
                            >
                              <BiEdit className="me-3" size={20} />
                            </NavLink>
                            <NavLink
                              onClick={() => handleDeleteProduct(prod.id)}
                            >
                              <BiTrash size={20} color="red" />
                            </NavLink>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
