export function validate (values) {
    let errors = {};
    if (!values.fullName) {
      errors.fullName = "Harap isi kolom ini!";
    }
    if (!values.jenisSampah) {
      errors.jenisSampah = "Harap pilih jenis sampah!";
    }
    if (!values.Berat) {
      errors.Berat = "Harap isi perkiraan berat sampah anda!";
    }
    if (!values.titikJemput) {
      errors.titikJemput = "Harap isi alamat dari titik jemput!";
    }
    return errors;
  }