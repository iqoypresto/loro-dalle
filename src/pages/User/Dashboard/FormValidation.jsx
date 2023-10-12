export function validate(values) {
  let errors = {};
  if (!values.fullName) {
    errors.fullName = "Harap isi kolom ini!";
  }
  if (!values.jenisSampah) {
    errors.jenisSampah = "Harap pilih jenis sampah!";
  }
  if (!values.berat) {
    errors.berat = "Harap isi perkiraan berat sampah anda!";
  }
  if (!values.titikJemput) {
    errors.titikJemput = "Harap isi alamat dari titik jemput!";
  }
  return errors;
}

export function validateDropOff(values) {
  let errors = {};
  if (!values.fullName) {
    errors.fullName = "Harap isi kolom ini!";
  }
  if (!values.jenisSampah) {
    errors.jenisSampah = "Harap pilih jenis sampah!";
  }
  if (!values.berat) {
    errors.berat = "Harap isi perkiraan berat sampah anda!";
  }
  return errors;
}

export function validateAddProduct(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Harap isi kolom ini!";
  }

  if (!values.price) {
    errors.price = "Harap isi harga produk!";
  }

  if (!values.stock) {
    errors.stock = "Harap isi stok produk!";
  }

  return errors;
}
