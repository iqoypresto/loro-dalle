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
  FormEditPickUp,
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
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const SwalReact = withReactContent(Swal);

export function UserDashboard() {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [isOpenPickUp, setIsOpenPickUp] = useState(false);
  const [isOpenDropOff, setIsOpenDropOff] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [finishedExchanges, setFinishedExchanges] = useState([]);
  const [unfinishedExchanges, setUnfinishedExchanges] = useState([]);
  const [reloadDataExchange, setReloadDataExchange] = useState(true);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isOpenEditExchange, setIsOpenEditExchange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClickPickUp() {
    setIsOpenPickUp(true);
  }
  function handleClickDropOff() {
    setIsOpenDropOff(true);
  }

  function onClosePickUp() {
    setIsOpenPickUp(false);
  }

  function onCloseDropOff() {
    setIsOpenDropOff(false);
  }

  function handleEditExchange(idx) {
    setActiveIdx(idx);
    setIsOpenEditExchange(true);
  }

  function onCloseEditForm() {
    setIsOpenEditExchange(false);
  }

  function onUpdateExhange() {
    setReloadDataExchange(true);
  }

  function handleDeclineExchange(id) {
    const authHeader = authService.authHeader();
    if (!authHeader) {
      navigate("/login");
    }

    SwalReact.fire({
      title: "Yakin membatalkan penukaran ini?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.value) {
        axios({
          method: "DELETE",
          url: `${BASE_URL}/trash-transactions/${id}`,
          headers: {
            ...authHeader,
          },
          withCredentials: true,
        })
          .then(() => {
            SwalReact.fire(
              "Sukses!",
              "Penukaran berhasil dibatalkan",
              "success"
            );
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
                title: "Gagal membatalkan penukaran",
                text: error.response.data.message,
              });
            }
          })
          .finally(() => {
            setReloadDataExchange(true);
          });
      }
    });
  }

  useEffect(() => {
    if (reloadDataExchange) {
      const authHeader = authService.authHeader();
      if (!authHeader) {
        navigate("/login");
      }

      axios({
        method: "GET",
        url: `${BASE_URL}/trash-transactions/users`,
        headers: {
          ...authHeader,
        },
        withCredentials: true,
      })
        .then((response) => {
          setFinishedExchanges(response.data.data.finishedTransactions);
          setUnfinishedExchanges(response.data.data.unfinishedTransactions);
          setIsLoad(true);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/dashboard");
          } else if (error.response.status === 401) {
            navigate("/login");
          } else {
            navigate("/");
          }
        })
        .finally(() => {
          setReloadDataExchange(false);
        });
    }
  }, [reloadDataExchange]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

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
          {isOpenEditExchange && (
            <FormEditPickUp
              data={unfinishedExchanges[activeIdx]}
              onClose={onCloseEditForm}
              onUpdate={onUpdateExhange}
            />
          )}
          <DashboardNavbar fullname={user.fullname} email="-" />
          {isOpenPickUp && <FormPickUp onClose={onClosePickUp} onUpdate={onUpdateExhange} />}
          {isOpenDropOff && <FormDropOff onClose={onCloseDropOff} onUpdate={onUpdateExhange}/>}
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
          <section id="exchange-history">
            <div className="border-b-2 border-b-teal-700 pb-10 mt-20 mb-8 w-full">
              <TealHeader title="Riwayat Penukaran" />
              <h4 className="text-teal-800 font-bold mb-5">
                PENUKARAN BELUM TERSELESAIKAN
              </h4>
              <div className="overflow-x-scroll">
                <table className="table-auto border w-full">
                  <thead className="text-teal-800 bg-gray-100">
                    <tr>
                      <th className="text-start p-3">ID</th>
                      <th className="text-start p-3">Jenis Penukaran</th>
                      <th className="text-start p-3">Nama</th>
                      <th className="text-start p-3">Jenis Sampah</th>
                      <th className="text-start p-3">Berat (Kg)</th>
                      <th className="text-start p-3">Lokasi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {unfinishedExchanges.length > 0 &&
                      unfinishedExchanges.map((exchange, idx) => (
                        <tr key={exchange.id}>
                          <td className="p-3">{exchange.id}</td>
                          <td className="p-3">{exchange.transaction_type}</td>
                          <td className="p-3">{exchange.fullname}</td>
                          <td className="p-3">{exchange.trash_type}</td>
                          <td className="p-3">{exchange.weight}</td>
                          <td className="p-3">{exchange.location}</td>
                          <td className="p-3">
                            <div className="flex">
                              <NavLink onClick={() => handleEditExchange(idx)}>
                                <BiEdit className="me-3" size={20} />
                              </NavLink>
                              <NavLink
                                onClick={() =>
                                  handleDeclineExchange(exchange.id)
                                }
                              >
                                <FaTimes size={20} color="red" />
                              </NavLink>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className="text-teal-800 font-bold mb-5">PENUKARAN SAMPAH</h4>
              <div className="overflow-x-scroll">
                <table className="table-auto border w-full  ">
                  <thead className="text-teal-800 bg-gray-100">
                    <tr>
                      <th className="text-start p-3">ID</th>
                      <th className="text-start p-3">Jenis Penukaran</th>
                      <th className="text-start p-3">Nama</th>
                      <th className="text-start p-3">Jenis Sampah</th>
                      <th className="text-start p-3">Berat (Kg)</th>
                      <th className="text-start p-3">Lokasi</th>
                      <th className="text-start p-3">Disetujui Pada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishedExchanges.length > 0 &&
                      finishedExchanges.map((exchange) => (
                        <tr key={exchange.id}>
                          <td className="p-3">{exchange.id}</td>
                          <td className="p-3">{exchange.transaction_type}</td>
                          <td className="p-3">{exchange.fullname}</td>
                          <td className="p-3">{exchange.trash_type}</td>
                          <td className="p-3">{exchange.weight}</td>
                          <td className="p-3">{exchange.location}</td>
                          <td className="p-3">
                            {formatDate(exchange.updated_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
