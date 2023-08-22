import { AdminNavbar, AdminTopNavbar } from "../../../components"
import { BiEdit, BiTrash } from "react-icons/bi"
import { Link } from "react-router-dom"

export const UserSection = () => {
    return (
        <div className="flex">
            <span>
                <AdminNavbar />
            </span>
            <div className="admin-content">
                <AdminTopNavbar />
                <h4 className="text-teal-800 font-bold">USERS</h4>
                <p className="text-teal-800 mb-10">List of Users</p>
                <table class="table-auto border w-full">
                    <thead>
                        <tr>
                            <th className="text-start py-3 px-2">ID</th>
                            <th className="text-start">Nama</th>
                            <th className="text-start">Email</th>
                            <th className="text-start">No. Telepon</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2">1</td>
                            <td>Muhammad Rifqi Maulana</td>
                            <td>rfqimaulana888@gmail.com</td>
                            <td>083149606671</td>
                            <td className="flex items-center py-3">
                                <Link><BiEdit className="me-3" size={20}/></Link>
                                <Link><BiTrash size={20} color="red"/></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}