import {
  TealHeader,
  WhiteHeader,
  Footer,
  UserDashboardCard,
  UserDashboardCardUp,
  UserDashboardCardDown,
  DashboardNavbar,
  WhiteButton,
  FormPickUp,
  FormDropOff,
} from "../../../components";
import DropOff from "../../../assets/drop-off-dashboard.png";
import PickUp from "../../../assets/pick-up-dashboard.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../../services/authService";
import { logout } from "../../../actions/authAction";

export function UserDashboard() {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [isOpenPickUp, setIsOpenPickUp] = useState(false);
  const [isOpenDropOff, setIsOpenDropOff] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClickPickUp() {
    setIsOpenPickUp(!isOpenPickUp);
  }
  function handleClickDropOff() {
    setIsOpenDropOff(!isOpenDropOff);
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isAdmin) {
      navigate("/admin-dashboard");
    }

    const authHeader = authService.authHeader();

    if (!authHeader) {
      navigate("/login");
    }

    setIsLoad(true);

    axios({
      method: "GET",
      url: `${BASE_URL}/users/user-dashboard-data`,
      headers: {
        ...authHeader,
      },
      withCredentials: true,
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        } else {
          navigate("/");
        }
      });
  }, []);

  return (
    <div>
      {isLoad && (
        <>
          <DashboardNavbar fullname={user.fullname} email="-" />
          {isOpenPickUp && <FormPickUp />}
          {isOpenDropOff && <FormDropOff />}
          <section id="userstat">
            <div className="content">
              <TealHeader title="Analisa Penukaran Kamu" />
              <div className="grid md:grid-cols-4 gap-14 md:gap-x-4 xl:gap-x-12">
                <div className="">
                  <UserDashboardCard
                    number={data.total_transactions | 0}
                    title="Total Penukaran"
                    explanation="Ayo tingkatkan penukaran!"
                  />
                </div>
                <div className="">
                  {data.monthly_rate >= 0 ? (
                    <UserDashboardCardDown
                      number={data.current_month_transactions | 0}
                      title="Penukaran dalam bulan ini"
                      explanation={
                        Math.abs(data.monthly_rate) +
                        "% meningkat dari bulan lalu"
                      }
                    />
                  ) : (
                    <UserDashboardCardUp
                      number={data.current_month_transactions | 0}
                      title="Penukaran dalam bulan ini"
                      explanation={
                        Math.abs(data.monthly_rate) +
                        "% menurun dari bulan lalu"
                      }
                    />
                  )}
                </div>
                <div className="">
                  {data.weekly_rate >= 0 ? (
                    <UserDashboardCardDown
                      number={data.current_week_transactions | 0}
                      title="Penukaran dalam seminggu"
                      explanation={
                        Math.abs(data.weekly_rate) +
                        "% meningkat dari minggu lalu"
                      }
                    />
                  ) : (
                    <UserDashboardCardUp
                      number={data.current_week_transactions | 0}
                      title="Penukaran dalam seminggu"
                      explanation={
                        Math.abs(data.weekly_rate) +
                        "% menurun dari minggu lalu"
                      }
                    />
                  )}
                </div>
                <div className="">
                  <UserDashboardCard
                    number={data.total_points | 0}
                    title="Total Poin"
                    explanation="Ayo tingkatkan penukaran!"
                  />
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
                    <p className="mt-2 mb-4">
                      Loro Dalle&apos;: Solusi Mudah untuk Penjemputan Rumah
                      Sampah Anda! Nikmati layanan penjemputan rumah sampah yang
                      cepat, andal, dan ramah lingkungan. Kami hadir untuk
                      menghilangkan beban Anda dalam mengelola sampah dengan
                      menyediakan layanan pengambilan sampah berkala sesuai
                      jadwal yang Anda inginkan. Bergabunglah dengan ribuan
                      pelanggan yang telah mempercayakan kami untuk menjaga
                      lingkungan bersih dan sehat. Segera buat janji penjemputan
                      rumah sampah Anda hari ini!
                    </p>
                    <span onClick={handleClickPickUp}>
                      <WhiteButton name="Tukarkan sampah" />
                    </span>
                  </div>
                </div>
                <div className="md:col-start-2">
                  <img src={DropOff} alt="" width={"100%"} />
                  <div className="mt-8">
                    <h4>Drop Off</h4>
                    <p className="mt-2 mb-4">
                      Drop Off Sampah dengan Mudah dan Bertanggung Jawab di Loro
                      Dalle&apos;! Kami mengerti bahwa kadang-kadang Anda
                      memiliki barang yang sudah tidak terpakai lagi, tetapi
                      Anda ingin membuangnya dengan benar. Dengan Loro
                      Dalle&apos;, Anda dapat menemukan tempat &apos;Drop
                      Off&apos; yang aman dan ramah lingkungan untuk membuang
                      barang-barang tersebut
                    </p>
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
      )}
    </div>
  );
}
