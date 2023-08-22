import { AdminNavbar, AdminTopNavbar } from "../../../components"

export const SampahSection = () => {
    return (
        <div className="flex">
            <span>
                <AdminNavbar />
            </span>
            <div className="admin-content">
                <AdminTopNavbar />
                <h4 className="text-teal-800 font-bold">PENUKARAN SAMPAH</h4>
                <p className="text-teal-800">Entire list of Penukaran Sampah</p>
                <table class="table-auto border w-full mt-10">
                    <thead>
                        <tr>
                            <th className="text-start py-3 px-2">ID</th>
                            <th className="text-start">Nama</th>
                            <th className="text-start">Email</th>
                            <th className="text-start">No. Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}