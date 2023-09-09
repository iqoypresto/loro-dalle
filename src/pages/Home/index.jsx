import { Navbar, TealButton, WhiteButton, TealHeader, WhiteHeader, HomeCard, HomeTestimoniCard, Footer } from "../../components";
import Hero from "../../assets/hero.png"
import PickUp from "../../assets/layanan-kami1.png"
import DropOff from "../../assets/layanan-kami2.png"
import product from "../../assets/product.png"
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = 'https://brave-pike-sheath-dress.cyclic.app';


export function Home() {
    const [products, setProducts] = useState([]);
    const [testimonies, setTestimonies] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/products?limit=3`)
        .then((response) => {
            setProducts(response.data.data.products)
        }).catch((error) => {})
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}/testimonies`)
        .then((response) => {
            setTestimonies(response.data.data.testimonies);
        }).catch((error) => {});
    }, []);

    return (
        <>
            <Navbar />
            <section id="hero">
                <img src={Hero} alt="garbage" />
                <div className="content">
                    <span className="items">

                        <h1>Ayo! Tukarkan Sampah Anda <br /> Menjadi Bermanfaat</h1>
                        <p className="pt-4 pb-8 font-medium">Sampah ta, Rejeki ta</p>
                        <TealButton name="Info lebih lanjut" />
                    </span>
                </div>
            </section>
            <section id="about">
                <div className="content">
                    <TealHeader title="Tentang Loro Dalle'" />
                    <p>Selamat datang di Loro Dalle' - Rumah Digital Anda untuk Solusi Rumah Sampah! Kami adalah komunitas online yang peduli tentang pengelolaan rumah sampah dan kelestarian lingkungan. Di Loro Dalle', kami menghadirkan informasi terkini, panduan praktis, dan layanan yang memudahkan Anda dalam menjaga kebersihan dan keberlanjutan lingkungan. Sama-sama kita berkontribusi untuk menciptakan dunia yang lebih hijau dan berkelanjutan. Bergabunglah dengan kami di Loro Dalle' hari ini, dan bersama-sama kita jadikan perubahan positif untuk masa depan planet kita!</p>
                </div>
            </section>
            <section id="layanan">
                <div className="content">
                    <WhiteHeader title="Layanan Kami" />
                    <div className="grid md:grid-cols-9 gap-10">
                        <div className="md:col-span-4">
                            <img src={PickUp} width="100%" alt="" />
                        </div>
                        <div className=" md:col-span-5">
                            <h4>Pick Up</h4>
                            <p className="ellipsis3 my-4">Loro Dalle': Solusi Mudah untuk Penjemputan Rumah Sampah Anda! Nikmati layanan penjemputan rumah sampah yang cepat, andal, dan ramah lingkungan. Kami hadir untuk menghilangkan beban Anda dalam mengelola sampah dengan menyediakan layanan pengambilan sampah berkala sesuai jadwal yang Anda inginkan. Bergabunglah dengan ribuan pelanggan yang telah mempercayakan kami untuk menjaga lingkungan bersih dan sehat. Segera buat janji penjemputan rumah sampah Anda hari ini!</p>
                            <WhiteButton name="Lihat selengkapnya" />
                        </div>
                        <div className="md:col-start-6 md:col-span-4">
                            <img src={DropOff} width="100%" alt="" />

                        </div>
                        <div className="md:row-start-2 md:col-span-5">
                            <h4>Drop Off</h4>
                            <p className="ellipsis3 my-4">Drop Off Sampah dengan Mudah dan Bertanggung Jawab di Loro Dalle'! Kami mengerti bahwa kadang-kadang Anda memiliki barang yang sudah tidak terpakai lagi, tetapi Anda ingin membuangnya dengan benar. Dengan Loro Dalle', Anda dapat menemukan tempat 'Drop Off' yang aman dan ramah lingkungan untuk membuang barang-barang tersebut</p>
                            <WhiteButton name="Lihat selengkapnya" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="produk">
                <div className="content">
                    <TealHeader title="Produk" />
                    <div className="grid md:grid-cols-3  gap-11 flex-wrap">
                        {products.length > 0 && products.map((prod) => (
                            <HomeCard
                                key={prod.id}
                                src={product}
                                product={prod}
                            />
                        ))}
                        <div className="md:col-span-3 mx-auto">
                            <TealButton name="Lihat semua produk" />
                        </div>
                    </div>

                </div>
            </section>
            <section id="testimoni">
                <div className="content">
                    <WhiteHeader title="Apa Kata Mereka?" />
                    <div className="flex">
                        {testimonies.length > 0 && <HomeTestimoniCard testimony={testimonies[0]} />}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}