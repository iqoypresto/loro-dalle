import { useState, useEffect } from "react"
import { validate } from "./FormValidation";
import { useNavigate } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

export function FormPickUp() {
    const initialValues = {
        fullName: "",
        jenisSampah: "",
        berat: "",
        titikJemput: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.table(formValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setIsOpen(!isOpen)
        }
    }, [formErrors])

    return (
        <>
            {isOpen &&
                <div className="pop-up" data-aos="fade-in">
                    <section className="form">
                        <FaTimes className="icon" onClick={handleClick} />
                        <div className="form-content">
                            <h4>Form Pick Up</h4>
                            <form action="" onSubmit={handleSubmit}>
                                <label htmlFor="fullName">Nama</label>
                                <input type="text" id="name" name="fullName" placeholder="eg: Budi Santoso" onChange={handleChange} />
                                <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.fullName}</p>
                                <label htmlFor="jenisSampah">Jenis sampah</label>
                                <select id="jenisSampah" name="jenisSampah" onChange={handleChange} defaultValue="">
                                    <option value="" disabled>Klik untuk memilih jenis sampah</option>
                                    <option value="organik">Organik</option>
                                    <option value="non-organik">Non-Organik</option>
                                </select>
                                <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.jenisSampah}</p>
                                <label htmlFor="berat">Berat sampah (Kg)</label>
                                <input type="number" id="berat" name="berat" placeholder="eg: 2" onChange={handleChange} />
                                <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.berat}</p>
                                <label htmlFor="titikJemput">Titik jemput</label>
                                <input type="text" id="titikJemput" name="titikJemput" placeholder="eg: Jl. Sampulungan No. 1" onChange={handleChange} />
                                <p className="text-red-600 mb-3 mt-1 text-sm">{formErrors.titikJemput}</p>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}

export function FormDropOff() {
    const [isOpen, setIsOpen] = useState(true);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            {isOpen &&
                <div className="pop-up" data-aos="fade-in">
                    <section className="form">
                        <FaTimes className="icon" onClick={handleClick} />
                        <div className="form-content">
                            <h4>Form Drop Off</h4>
                            <form action="">
                                <label htmlFor="name">Nama</label>
                                <input type="text" id="name" name="name" placeholder="eg: Budi Santoso" />
                                <p className="text-red-600 mb-3"></p>
                                <label htmlFor="name">Jenis sampah</label>
                                <select id="jenis-sampah" name="jenis-sampah" defaultValue="">
                                    <option value="" disabled>Klik untuk memilih jenis sampah</option>
                                    <option value="organik">Organik</option>
                                    <option value="non-organik">Non-Organik</option>
                                </select>
                                <label htmlFor="berat">Berat sampah (perkiraan)</label>
                                <input type="number" id="berat" name="berat" placeholder="eg: 2" />
                                <p className="text-red-600 mb-3"></p>
                                <p className="text-red-600 mb-3"></p>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}
