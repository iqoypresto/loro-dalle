import {
    TealHeader, WhiteHeader, Navbar, Footer, UserDashboardCard, UserDashboardCardUp, UserDashboardCardDown, DashboardNavbar, WhiteButton, FormPickUp, FormDropOff
} from "../../../components";
import DropOff from "../../../assets/drop-off-dashboard.png"
import PickUp from "../../../assets/pick-up-dashboard.png"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = 'https://brave-pike-sheath-dress.cyclic.app';

export function UserDashboard() {
    const [data, setData] = useState({})
    const [isOpenPickUp, setIsOpenPickUp] = useState(false)
    const [isOpenDropOff, setIsOpenDropOff] = useState(false)
    const [profile, setProfile] = useState({})

    function handleClickPickUp() {
        setIsOpenPickUp(!isOpenPickUp);
    }
    function handleClickDropOff() {
        setIsOpenDropOff(!isOpenDropOff);
    }

    useEffect(() => {
        const accessToken = Cookies.get('auth');
        axios({
            method: 'GET',
            url: `${BASE_URL}/users/user-dashboard-data`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then((response) => {
            setData(response.data.data)
        }).catch((error) => {
            // HANDLE ERROR
            console.log(error);
        },)
    }, [])

    return (
        <>
            <DashboardNavbar name="Anto Bukan Maen" email="Anto@gmail.com"/>
            {isOpenPickUp &&
                <FormPickUp />
            }
            {isOpenDropOff &&
                <FormDropOff />
            }
            <section id="userstat">
                <div className="content">
                    <TealHeader title="Analisa Penukaran Kamu" />
                    <div className="grid md:grid-cols-4 gap-14 md:gap-x-4 xl:gap-x-12">
                        <div className="">
                            <UserDashboardCard number={data.total_transactions | 0} title="Total Penukaran" explanation="Ayo tingkatkan penukaran!" />
                        </div>
                        <div className="">
                            {
                                data.monthly_rate >= 0 ? 
                                    <UserDashboardCardDown number={data.current_month_transactions | 0} title="Penukaran dalam bulan ini" explanation={Math.abs(data.monthly_rate) + "% meningkat dari bulan lalu"} />
                                    : <UserDashboardCardUp number={data.current_month_transactions | 0} title="Penukaran dalam bulan ini" explanation={Math.abs(data.monthly_rate) + "% menurun dari bulan lalu"} />
                            }
                        </div>
                        <div className="">
                            {
                                data.weekly_rate >= 0 ? 
                                    <UserDashboardCardDown number={data.current_week_transactions | 0} title="Penukaran dalam seminggu" explanation={Math.abs(data.weekly_rate) + "% meningkat dari minggu lalu"} />
                                    : <UserDashboardCardUp number={data.current_week_transactions | 0} title="Penukaran dalam seminggu" explanation={Math.abs(data.weekly_rate) + "% menurun dari minggu lalu"} />
                            }
                        </div>
                        <div className="">
                            <UserDashboardCard number={data.total_points | 0} title="Total Poin" explanation="Ayo tingkatkan penukaran!" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="layanan">
                <div className="content">
                    <WhiteHeader title="Ayo Tukarkan Sampahmu!" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="md:col-start-1">
                            <img src={PickUp} alt="" width={"100%"} />
                            <div className="mt-8">
                                <h4>Pick Up</h4>
                                <p className="ellipsis2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut voluptatibus temporibus officiis eius laborum! Placeat nisi expedita iste totam dolorem laudantium perferendis hic eos dolor dignissimos deserunt facere ipsam, adipisci consectetur exercitationem eius ex consequuntur perspiciatis ad. Ex fugiat velit veritatis ea praesentium, rerum minus qui illo blanditiis, eligendi saepe tempora enim reprehenderit, perspiciatis ab quia nobis iusto delectus necessitatibus sapiente deleniti. Accusantium, nobis quas amet expedita, nemo quod commodi, quam nulla tempore praesentium facere quaerat. Delectus voluptates in et nobis molestias quae ducimus blanditiis, perspiciatis est. Tempora, pariatur veniam quae officia laudantium unde, aut dolores eligendi iusto blanditiis sed?</p>
                                <span onClick={handleClickPickUp}>
                                    <WhiteButton name="Tukarkan sampah" />
                                </span>
                            </div>
                        </div>
                        <div className="md:col-start-2">
                            <img src={DropOff} alt="" width={"100%"} />
                            <div className="mt-8">
                                <h4>Drop Off</h4>
                                <p className="ellipsis2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos saepe error aliquid dicta eos, iure distinctio quidem aut, veritatis nesciunt optio dolorum perferendis fuga reiciendis maiores placeat commodi, omnis nihil? Nihil quidem suscipit corrupti ea fuga quasi beatae assumenda, optio alias tempora consequatur at reiciendis nobis fugiat. Tenetur, nulla magnam? Exercitationem, inventore aut illo dicta enim obcaecati, minus cupiditate similique pariatur vero iure quos delectus a sapiente! Ratione maiores doloribus modi fugiat eveniet quos culpa ab. Laborum labore cumque quod commodi earum atque suscipit officia veritatis, saepe cupiditate vel aliquid voluptate, unde expedita possimus at aspernatur culpa, molestiae in est.</p>
                                <span onClick={handleClickDropOff}>
                                    <WhiteButton name="Tukarkan sampah" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}