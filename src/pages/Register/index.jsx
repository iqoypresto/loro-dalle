import { TealHeader } from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validate } from "./RegisterValidation";
import Icon from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye"
import { eyeOff } from "react-icons-kit/feather/eyeOff"
import ValidationImg from "../../assets/reg-validation.svg";

export function Register() {
  const initialValues = {
    fullname: "",
    telnumber: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmmit] = useState(false);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/register-success", {replace: true});
    }
  }, [formErrors]);

  const handleToggle = () => {
    if (type==='password'){
      setIcon(eye);
      setType('text');
    }
    else{
      setIcon(eyeOff);
      setType('password')
    }
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto text-teal-800 py-20 p-4">
        <p className="flex justify-center text-xl font-semibold">
          Loro Dalle'
        </p>
        <div className="reg-header">
          <TealHeader title="Buat Akun" />
        </div>
        <div className="mx-auto text-center max-w-3xl">
          Pastikan anda telah terdaftar sebagai masyarakat Desa
          Sampulungan untuk membuat akun agar dapat menukarkan sampah
        </div>
        <form action="" className="pt-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-black">Nama Lengkap</label>
            <input
              className="block border shadow rounded w-full h-9
                mt-2 px-2 text-black focus:outline-none focus:border-teal-700"
              type="text"
              name="fullname"
              placeholder="eg: Budi Santoso"
              value={formValues.fullname}
              onChange={handleChange}
            ></input>
            <p className="text-red-600 mb-2">{formErrors.fullname}</p>
          </div>
          <div>
            <label className="text-black">Nomor Telepon / WhatsApp (WA)</label>
            <input
              className="block border shadow rounded w-full h-9
                mt-2 px-2 text-black"
              type="tel"
              name="telnumber"
              placeholder="eg: 081234567894"
              value={formValues.telnumber}
              onChange={handleChange}
            ></input>
            <p className="text-red-600 mb-2">{formErrors.telnumber}</p>
          </div>
          <div>
            <label className="text-black">Email</label>
            <input
              className="block border shadow rounded w-full h-9
                mt-2 px-2 text-black"
              type="text"
              name="email"
              placeholder="eg: email@gmail.com"
              value={formValues.email}
              onChange={handleChange}
            ></input>
            <p className="text-red-600 mb-2">{formErrors.email}</p>
          </div>
          <div>
                <label className="text-black">Kata Sandi</label>
                <div className="flex items-center border shadow rounded w-full
                mt-2 justify-between focus:ring-2 relative">
                  <input
                    className="w-full h-9
                px-2 text-black rounded "
                    type={type}
                    name="password"
                    placeholder="eg: password123"
                    onChange={handleChange}
                  ></input>
                  <span className="mx-2 px-1 flex items-center absolute right-0 aspect-square hover:dark:bg-gray-200 rounded-full text-black" onClick={handleToggle}>
                    <Icon icon={icon} size={15} className="cursor-pointer"></Icon>
                  </span>
                </div>
                <p className="text-red-600 mb-2">{formErrors.password}</p>
          </div>
          <div>
            <label className="text-black">Konfirmasi Kata Sandi</label>
            <input
              className="block border shadow rounded w-full h-9
                mt-2 px-2 text-black"
              type="password"
              name="confirmpassword"
              placeholder="eg: password123"
              value={formValues.confirmpassword}
              onChange={handleChange}
            ></input>
            <p className="text-red-600 mb-2">{formErrors.confirmpassword}</p>
          </div>
          <div className="flex items-center mt-4">
            <input className="me-2" type="checkbox" required></input>
            <span>
              Saya termasuk masyarakat Desa Sampulungan dan setuju dengan <b>Syarat dan Ketentuan</b> yang berlaku
            </span>
          </div>
          <div>
            <button
              type="submit"
              className="dark:bg-teal-800 text-white py-3 px-4 mt-5 font-medium w-full hover:dark:bg-teal-900"
            >
              Buat Akun
            </button>
          </div>
        </form>
        <div className="text-right pt-2 text-sm">
          <Link to="/login" replace="true">Kembali ke laman login</Link>
        </div>
      </div>
    </>
  );
}

export function RegisterSuccess(){
    return(
        <>  
        <div className="max-w-screen-2xl mx-auto text-teal-800 py-20 p-4">
            <div className="flex justify-center text-xl pb-8 font-semibold">
                Loro Dalle'
            </div>
            <div className="flex justify-center mb-8">
                <img src={ValidationImg}></img>
            </div>
            <div className="reg-header">
                <TealHeader title="Selamat! Anda telah membuat akun"/>
            </div>
            <div className="mx-auto text-center max-w-3xl">
                Selanjutnya, akan divalidasi terlebih dahulu oleh lembaga terkait. Silahkan cek di email atau di WhatsApp anda (WA) anda untuk mengetahui apakah pembuatan akun diterima atau tidak.
            </div>
            <div>
                    <Link to="/" replace="true" className="w-full">
                        <button className="dark:bg-teal-800 text-white py-3 px-4 mt-5 font-medium w-full hover:dark:bg-teal-900">
                        Kembali ke halaman utama
                        </button>
                    </Link>
                </div>
        </div>
        </>
    )
};

