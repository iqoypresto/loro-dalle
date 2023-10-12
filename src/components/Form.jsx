import { useState, useEffect } from "react";
import {
  validate,
  validateAddProduct,
  validateDropOff,
} from "../pages/User/Dashboard/FormValidation";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authAction";

const SwalReact = withReactContent(Swal);

export function FormPickUp() {
  const initialValues = {
    fullName: "",
    jenisSampah: "",
    berat: "",
    titikJemput: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      axios({
        method: "POST",
        url: `${BASE_URL}/trash-transactions/pick-up`,
        headers: {
          ...authHeader,
        },
        data: {
          fullname: formValues.fullName,
          type: formValues.jenisSampah,
          weight: formValues.berat,
          location: formValues.titikJemput,
        },
        withCredentials: true,
      })
        .then(() => {
          setIsOpen(false);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          } else {
            setIsSubmit(false);
            SwalReact.fire({
              icon: "error",
              title: "Gagal membuat penukaran",
              text: error.response.data.message,
            });
          }
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <>
      {isOpen && (
        <div className="pop-up" data-aos="fade-in">
          <section className="form">
            <FaTimes className="icon" onClick={handleClick} />
            <div className="form-content">
              <h4>Form Pick Up</h4>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Nama</label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  placeholder="eg: Budi Santoso"
                  onChange={handleChange}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.fullName}
                </p>
                <label htmlFor="jenisSampah">Jenis sampah</label>
                <select
                  id="jenisSampah"
                  name="jenisSampah"
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Klik untuk memilih jenis sampah
                  </option>
                  <option value="organik">Organik</option>
                  <option value="anorganik">Non-Organik</option>
                </select>
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.jenisSampah}
                </p>
                <label htmlFor="berat">Berat sampah (Kg)</label>
                <input
                  type="number"
                  id="berat"
                  name="berat"
                  placeholder="eg: 2"
                  onChange={handleChange}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.berat}
                </p>
                <label htmlFor="titikJemput">Titik jemput</label>
                <input
                  type="text"
                  id="titikJemput"
                  name="titikJemput"
                  placeholder="eg: Jl. Sampulungan No. 1"
                  onChange={handleChange}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.titikJemput}
                </p>
                <button type="submit" disabled={isSubmit}>
                  {isSubmit ? "Sedang menukarkan ..." : "Tukar"}
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function FormEditPickUp({ data, onClose, onUpdate }) {
  const initialValues = {
    fullName: data.fullname,
    jenisSampah: data.trash_type,
    berat: data.weight,
    titikJemput: data.location,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.table(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      axios({
        method: "PUT",
        url: `${BASE_URL}/trash-transactions/${data.id}`,
        headers: {
          ...authHeader,
        },
        data: {
          fullname: formValues.fullName,
          type: formValues.jenisSampah,
          weight: formValues.berat,
          location: formValues.titikJemput,
        },
        withCredentials: true,
      })
        .then(() => {
          setIsOpen(false);
          onUpdate();
          onClose();
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          } else {
            setIsSubmit(false);
            SwalReact.fire({
              icon: "error",
              title: "Gagal membuat penukaran",
              text: error.response.data.message,
            });
          }
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <>
      {isOpen && (
        <div className="pop-up z-50" data-aos="fade-in">
          <section className="form">
            <FaTimes className="icon" onClick={onClose} />
            <div className="form-content">
              <h4>Form Edit Penukaran</h4>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Nama</label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  placeholder="eg: Budi Santoso"
                  onChange={handleChange}
                  defaultValue={data.fullname}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.fullName}
                </p>
                <label htmlFor="jenisSampah">Jenis sampah</label>
                <select
                  id="jenisSampah"
                  name="jenisSampah"
                  onChange={handleChange}
                  defaultValue={data.trash_type}
                >
                  <option value="" disabled>
                    Klik untuk memilih jenis sampah
                  </option>
                  <option value="organik">Organik</option>
                  <option value="anorganik">Non-Organik</option>
                </select>
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.jenisSampah}
                </p>
                <label htmlFor="berat">Berat sampah (Kg)</label>
                <input
                  type="number"
                  id="berat"
                  name="berat"
                  placeholder="eg: 2"
                  onChange={handleChange}
                  defaultValue={data.weight}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.berat}
                </p>
                <label htmlFor="titikJemput">Titik jemput</label>
                <input
                  type="text"
                  id="titikJemput"
                  name="titikJemput"
                  placeholder="eg: Jl. Sampulungan No. 1"
                  onChange={handleChange}
                  defaultValue={data.location}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.titikJemput}
                </p>
                <button type="submit" disabled={isSubmit}>
                  {isSubmit ? "Sedang menukarkan ..." : "Tukar"}
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function FormDropOff() {
  const initialValues = {
    fullName: "",
    jenisSampah: "",
    berat: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateDropOff(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      axios({
        method: "POST",
        url: `${BASE_URL}/trash-transactions/drop-off`,
        headers: {
          ...authHeader,
        },
        data: {
          fullname: formValues.fullName,
          type: formValues.jenisSampah,
          weight: formValues.berat,
        },
        withCredentials: true,
      })
        .then(() => {
          setIsOpen(!isOpen);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          } else {
            setIsSubmit(false);
            SwalReact.fire({
              icon: "error",
              title: "Gagal membuat penukaran",
              text: error.response.data.message,
            });
          }
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <>
      {isOpen && (
        <div className="pop-up" data-aos="fade-in">
          <section className="form">
            <FaTimes className="icon" onClick={handleClick} />
            <div className="form-content">
              <h4>Form Drop Off</h4>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Nama</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="eg: Budi Santoso"
                  onChange={handleChange}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.fullName}
                </p>
                <label htmlFor="jenisSampah">Jenis sampah</label>
                <select
                  id="jenisSampah"
                  name="jenisSampah"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Klik untuk memilih jenis sampah
                  </option>
                  <option value="organik">Organik</option>
                  <option value="anorganik">Non-Organik</option>
                </select>
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.jenisSampah}
                </p>
                <label htmlFor="berat">Berat sampah (perkiraan)</label>
                <input
                  type="number"
                  id="berat"
                  name="berat"
                  placeholder="eg: 2"
                  onChange={handleChange}
                />
                <p className="text-red-600 mb-3 mt-1 text-sm">
                  {formErrors.berat}
                </p>
                <button type="submit" disabled={isSubmit}>
                  {isSubmit ? "Sedang menukarkan ..." : "Tukar"}
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function FormAddProduct({ onCLose, onUpdate }) {
  const initialValues = {
    title: "",
    description: "",
    price: 0,
    stock: 0,
    type: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateAddProduct(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      axios({
        method: "POST",
        url: `${BASE_URL}/products`,
        headers: {
          ...authHeader,
        },
        data: formValues,
        withCredentials: true,
      })
        .then(() => {
          onUpdate();
          onCLose();
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          } else {
            setIsSubmit(false);
            SwalReact.fire({
              icon: "error",
              title: "Gagal membuat produk",
              text: error.response.data.message,
            });
          }
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <div className="pop-up z-50" data-aos="fade-in">
      <section className="form">
        <FaTimes className="icon" onClick={onCLose} />
        <div className="form-content">
          <h4>Form Tambah Produk</h4>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="title">Nama Produk</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="eg: Lampu Hias Daur Ulang"
              onChange={handleChange}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.title}</p>
            <label htmlFor="description">Deskripsi Produk</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="eg: Lampu hias cantik yang terbuat dari bahan daur ulang"
              onChange={handleChange}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">
              {formErrors.description}
            </p>
            <label htmlFor="price">Harga Produk</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="eg: 20000"
              onChange={handleChange}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.price}</p>
            <label htmlFor="stock">Stok Produk</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="eg: 10"
              onChange={handleChange}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.stock}</p>
            <label htmlFor="type">Jenis Produk</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="eg: Kerajinan"
              onChange={handleChange}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.type}</p>
            <button type="submit" disabled={isSubmit}>
              {isSubmit ? "Sedang menambahkan ..." : "Tambah"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export function FormEditProduct({ data, onClose, onUpdate }) {
  const initialValues = {
    title: data.title,
    description: data.description,
    price: data.price,
    stock: data.stock,
    type: data.type,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateAddProduct(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      axios({
        method: "PUT",
        url: `${BASE_URL}/products/${data.id}`,
        headers: {
          ...authHeader,
        },
        data: formValues,
        withCredentials: true,
      })
        .then(() => {
          onUpdate();
          onClose();
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          } else {
            setIsSubmit(false);
            SwalReact.fire({
              icon: "error",
              title: "Gagal membuat produk",
              text: error.response.data.message,
            });
          }
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <div className="pop-up z-50" data-aos="fade-in">
      <section className="form">
        <FaTimes className="icon" onClick={onClose} />
        <div className="form-content">
          <h4>Form Edit Produk</h4>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="title">Nama Produk</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="eg: Lampu Hias Daur Ulang"
              onChange={handleChange}
              defaultValue={data.title}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.title}</p>
            <label htmlFor="description">Deskripsi Produk</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="eg: Lampu hias cantik yang terbuat dari bahan daur ulang"
              onChange={handleChange}
              defaultValue={data.description}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">
              {formErrors.description}
            </p>
            <label htmlFor="price">Harga Produk</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="eg: 20000"
              onChange={handleChange}
              defaultValue={data.price}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.price}</p>
            <label htmlFor="stock">Stok Produk</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="eg: 10"
              onChange={handleChange}
              defaultValue={data.stock}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.stock}</p>
            <label htmlFor="type">Jenis Produk</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="eg: Kerajinan"
              onChange={handleChange}
              defaultValue={data.type}
            />
            <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.type}</p>
            <button type="submit" disabled={isSubmit}>
              {isSubmit ? "Sedang mengedit ..." : "Edit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
