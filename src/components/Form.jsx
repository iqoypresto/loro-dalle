export function FormPickUp() {
    return (
        <>
            <div className="form-content">
                <h4>Form Pick Up</h4>
                <form action="">
                    <label htmlFor="name">Nama</label>
                    <input type="text" id="name" name="name" placeholder="Nama..." />
                    <p className="text-red-600 mb-3"></p>
                    <label htmlFor="name">Jenis sampah</label>
                    <select id="jenis-sampah" name="jenis-sampah">
                        <option value="organik">Organik</option>
                        <option value="non-organik">Non-Organik</option>
                    </select>
                    <label htmlFor="berat">Berat sampah (perkiraan)</label>
                    <input type="number" id="berat" name="berat" placeholder="Berat (Kg)..." />
                    <p className="text-red-600 mb-3"></p>
                    <label htmlFor="titik-jemput">Titik jemput</label>
                    <input type="text" id="titik-jemput" name="titik-jemput" placeholder="Titik jemput..." />
                    <p className="text-red-600 mb-3"></p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export function FormDropOff() {
    return (
        <>
            <div className="form-content">
                <h4>Form Drop Off</h4>
                <form action="">
                    <label htmlFor="name">Nama</label>
                    <input type="text" id="name" name="name" placeholder="Nama..." />
                    <p className="text-red-600 mb-3"></p>
                    <label htmlFor="name">Jenis sampah</label>
                    <select id="jenis-sampah" name="jenis-sampah">
                        <option value="organik">Organik</option>
                        <option value="non-organik">Non-Organik</option>
                    </select>
                    <label htmlFor="berat">Berat sampah (perkiraan)</label>
                    <input type="number" id="berat" name="berat" placeholder="Berat (Kg)..." />
                    <p className="text-red-600 mb-3"></p>
                    <p className="text-red-600 mb-3"></p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}