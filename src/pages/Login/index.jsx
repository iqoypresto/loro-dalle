import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "./LoginValidation";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { BiUser, BiLockAlt } from "react-icons/bi";

import bgTopLeft from "../../assets/ellipse-1.svg";
import bgBotLeft from "../../assets/ellipse-2.svg";
import bgBotRight from "../../assets/ellipse-3.svg";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authAction";

const SwalReact = withReactContent(Swal);

export function Login() {
  const initialValues = {
    email: "",
    password: "",
    role: "user",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));

    if (Object.keys(formErrors).length === 0) {
      dispatch(login(formValues.email, formValues.password))
        .then(() => {
          navigate("/dashboard");
          window.location.reload();
        })
        .catch((error) => {
          setIsSubmit(false);
          if (error.status === 409) {
            navigate("/register-success");
          } else {
            SwalReact.fire({
              icon: "error",
              title: "Gagal Login",
              text: error.message,
            });
          }
        });
    } else {
      console.log("OK");
      setIsSubmit(false);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="w-full h-screen  items-center flex relative bg-teal-900 overflow-hidden">
        <img src={bgTopLeft} alt="" className="absolute top-0 z-0" />
        <img src={bgBotLeft} alt="" className="absolute bottom-0 z-0" />
        <img
          src={bgBotRight}
          alt=""
          className="absolute bottom-0 right-0 z-0"
        />
        <div
          className="mx-auto box-border p-4 overflow-hidden text-white z-10 w-96"
          data-aos="zoom-out-down"
        >
          <div className="pb-7">
            <h1 className="text-center text-3xl pb-1 font-medium">Login</h1>
            <p className="text-center">Masukkan email dan kata sandi</p>
          </div>
          <form className="pb-5" action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="flex items-center border rounded-xl overflow-hidden bg-teal-900">
                <BiUser className="ms-1" size={25} />
                <div className="user-input-wrp">
                  <input
                    className="inputText block w-full bg-transparent py-3 px-2 focus:outline-none"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                  <span className="floating-label">Email/Nomor Telepon</span>
                </div>
              </div>
              <p className="text-red-600 text-sm">{formErrors.email}</p>
              <div className="flex items-center mt-4 border rounded-xl overflow-hidden bg-teal-900">
                <BiLockAlt className="ms-1" size={25} />
                <div className="user-input-wrp">
                  <input
                    className="inputText block w-full bg-transparent py-3 px-2 focus:outline-none"
                    type={type}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <span className="floating-label">Password</span>
                </div>
                <Icon
                  icon={icon}
                  size={15}
                  className="cursor-pointer me-2"
                  onClick={handleToggle}
                ></Icon>
              </div>
              <p className="text-red-600 text-sm">{formErrors.password}</p>
              <a
                href="#"
                className="text-right w-full block text-xs mt-2 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="rounded-xl p-2 block w-full bg-green-500 text-black hover:bg-green-600"
            >
              {isSubmit ? "Sedang Login ..." : "Login"}
            </button>
          </form>
          <p className="text-xs text-center">
            Belum punya akun?{" "}
            <Link
              className="text-blue-500 italic hover:underline"
              to="/register"
            >
              {" "}
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
