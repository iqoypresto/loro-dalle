import { Navbar, TealButton, WhiteButton, TealHeader, WhiteHeader, HomeCard, HomeTestimoniCard, Footer } from "../../components";
import Hero from "../../assets/hero.png"
import PickUp from "../../assets/layanan-kami1.png"
import DropOff from "../../assets/layanan-kami2.png"
import product from "../../assets/product.png"

export function Home() {
    return (
        <>
            <Navbar />
            <section id="hero">
            <img src={Hero} alt="garbage"/>
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, quidem inventore delectus quis placeat suscipit animi aliquam impedit fugit voluptatem, distinctio eius reiciendis magni itaque mollitia est repudiandae quas, molestiae neque recusandae culpa eos blanditiis. Quia aut aliquam atque illo eligendi inventore temporibus, corporis a, nisi vero id, cum earum.</p>
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
                            <p className="ellipsis3 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consequatur dolor reiciendis quae a, laborum, sint non harum voluptates dolore quam inventore temporibus. Voluptatem quae, saepe possimus in accusamus sint non laborum maxime modi odio debitis assumenda quis ut ducimus corporis sequi aliquam vero aut suscipit. Modi in asperiores saepe.</p>
                            <WhiteButton name="Lihat selengkapnya" />
                        </div>
                        <div className="md:col-start-6 md:col-span-4">
                            <img src={DropOff} width="100%" alt="" />

                        </div>
                        <div className="md:row-start-2 md:col-span-5">
                            <h4>Drop Off</h4>
                            <p className="ellipsis3 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consequatur dolor reiciendis quae a, laborum, sint non harum voluptates dolore quam inventore temporibus. Voluptatem quae, saepe possimus in accusamus sint non laborum maxime modi odio debitis assumenda quis ut ducimus corporis sequi aliquam vero aut suscipit. Modi in asperiores saepe.</p>
                            <WhiteButton name="Lihat selengkapnya" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="produk">
                <div className="content">
                    <TealHeader title="Produk" />
                    <div className="grid md:grid-cols-3  gap-11 flex-wrap">
                        <div className="md:col-start-1">
                            <HomeCard
                                src={product}
                                title="Nama Produk"
                                content="Deskripsi Produk bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
                            />
                        </div>
                        <div className="md:col-start-2">
                            <HomeCard
                                src={product}
                                title="Nama Produk"
                                content="Deskripsi Produk bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
                            />
                        </div>
                        <div className="md:col-start-3">
                            <HomeCard
                                src={product}
                                title="Nama Produk"
                                content="Deskripsi Produk bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
                            />
                        </div>

                    </div>
                </div>
            </section>
            <section id="testimoni">
                <div className="content">
                    <WhiteHeader title="Apa Kata Mereka?" />
                    <div className="flex">
                        <HomeTestimoniCard />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}