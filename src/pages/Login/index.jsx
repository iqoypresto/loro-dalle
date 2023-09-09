import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { validate } from "./LoginValidation";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye"
import { eyeOff } from "react-icons-kit/feather/eyeOff"
import { BiUser, BiLockAlt } from "react-icons/bi";

import bgTopLeft from "../../assets/ellipse-1.svg";
import bgBotLeft from "../../assets/ellipse-2.svg";
import bgBotRight from "../../assets/ellipse-3.svg";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = 'https://brave-pike-sheath-dress.cyclic.app';

export function Login() {
  const initialValues = {
    email: "",
    password: "",
    role: "user"
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues)
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    }
    else {
      setIcon(eyeOff);
      setType('password')
    }
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit && formValues.role === "user") {
      axios.post(`${BASE_URL}/login`, {
        email: formValues.email,
        password: formValues.password,
      }).then((response) => {
        Cookies.set('auth', response.data.data.accessToken, { expires: 1 });
        navigate("/dashboard");
      }).catch((error) => {
        // HANDLE LOGIN ERROR
        console.log({error});
        setFormErrors(validate(true));
        console.log(formErrors)
      })
    }
    else if (Object.keys(formErrors).length === 0 && isSubmit && formValues.role === "admin"){
      navigate("/admin-dashboard")
    }
  }, [formErrors]);

  return (
    <>
      <div className="w-full h-screen  items-center flex relative bg-teal-900 overflow-hidden">
        <img src={bgTopLeft} alt="" className="absolute top-0 z-0" />
        <img src={bgBotLeft} alt="" className="absolute bottom-0 z-0" />
        <img src={bgBotRight} alt="" className="absolute bottom-0 right-0 z-0" />
        <div className="mx-auto box-border p-4 overflow-hidden text-white z-10 w-96" data-aos="zoom-out-down">
          <div className="pb-7">
            <h1 className="text-center text-3xl pb-1 font-medium">Login</h1>
            <p className="text-center">Masukkan email dan kata sandi</p>
          </div>
          <form className="pb-5" action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="flex items-center border rounded-xl overflow-hidden bg-teal-900">
                <BiUser className="ms-1" size={25} />
                <div className="user-input-wrp">
                  <input className="inputText block w-full bg-transparent py-3 px-2 focus:outline-none" type="text" name="email" onChange={handleChange} required/>
                  <span className="floating-label">Email/Nomor Telepon</span>
                </div>
              </div>
              <p className="text-red-600 text-sm">{formErrors.email}</p>
              <div className="flex items-center mt-4 border rounded-xl overflow-hidden bg-teal-900">
                <BiLockAlt className="ms-1" size={25} />
                <div className="user-input-wrp">
                  <input className="inputText block w-full bg-transparent py-3 px-2 focus:outline-none" type={type} name="password" onChange={handleChange} required />
                  <span className="floating-label">Password</span>
                </div>
                <Icon icon={icon} size={15} className="cursor-pointer me-2" onClick={handleToggle}></Icon>
              </div>
              <p className="text-red-600 text-sm">{formErrors.password}</p>
              <div className="flex items-center mt-4 border rounded-xl overflow-hidden">
                <select className="focus:outline-none w-full bg-transparent px-2 py-3" name="role" defaultValue="user" onChange={handleChange}>
                  <option className="bg-teal-900" value="user">User</option>
                  <option className="bg-teal-900" value="admin">Admin</option>
                </select>
              </div>
              <a href="#" className="text-right w-full block text-xs mt-2 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="rounded-xl p-2 block w-full bg-green-500 text-black hover:dark:bg-green-600">Login</button>
          </form>
          <p className="text-xs text-center">Belum punya akun? <Link className="text-blue-500 italic hover:underline" to="/register"> Daftar disini</Link></p>
        </div>
      </div>
    </>
  );
}
