import { AdminNavbar, AdminTopNavbar } from "../../../components"

export const AdminDashboard = () => {
    return (
        <div className="flex">
            <span>
                <AdminNavbar />
            </span>
            <div className="admin-content">
                <AdminTopNavbar />
                <h4 className="text-teal-800 font-bold">DASHBOARD</h4>
                <p className="text-teal-800 mb-5">Selamat datang di dashboard!</p>
                <div className="grid grid-cols-6 gap-5">
                    <div className="border rounded-xl col-start-1 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">525</h5>
                            <div className="flex justify-between">
                                <p>+5%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-2 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Penukaran Sampah</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">1250</h5>
                            <div className="flex justify-between">
                                <p>+10%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl row-span-2 col-start-3 col-end-7 p-5 items-center flex admin-card">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam illo dolorum debitis officia vel repudiandae perferendis enim aspernatur? Obcaecati nostrum esse rerum unde distinctio? Porro neque voluptatem sunt quis qui similique accusamus architecto rerum. Delectus ex quibusdam ducimus fugiat iure accusamus quaerat, deserunt nesciunt harum, aut sit! Pariatur dolores ea, adipisci ullam quaerat nulla quam totam rerum voluptatibus aliquam amet, labore eaque, deserunt excepturi vero. Labore numquam ipsa similique dolorem voluptatum perspiciatis commodi saepe possimus ex eligendi sit provident quos, ad quo at in maxime quas, optio placeat molestiae error voluptate autem. Suscipit illo culpa pariatur enim nobis? Laudantium, molestias.
                    </div>
                    <div className="border rounded-xl col-start-1 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">525</h5>
                            <div className="flex justify-between">
                                <p>+5%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl col-start-2 p-5 items-center flex admin-card">
                        <div className="w-full">
                            <p className="mb-3">Total Users</p>
                            <h5 className="mb-3 text-teal-700 font-semibold">525</h5>
                            <div className="flex justify-between">
                                <p>+5%</p>
                                <p>Sejak bulan lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, eligendi dicta libero cum ab minus obcaecati hic, perspiciatis beatae nemo unde. Esse delectus enim molestiae ipsam, dolore minus, provident id maxime, harum repellat culpa eligendi. Labore blanditiis quas quae tempore esse provident quaerat necessitatibus quisquam, reiciendis doloremque nesciunt maiores laudantium aperiam, minus officia repudiandae. Tenetur adipisci incidunt ab at, delectus quod quos fuga! Sequi molestiae similique molestias incidunt quis in cupiditate ullam dolore dolores, quibusdam illum commodi eaque optio, blanditiis magni ipsum reprehenderit modi minima! Eum laboriosam blanditiis hic culpa optio molestias omnis, quia id, consequatur itaque fuga sequi maxime?
            </div>
        </div>
    )
}