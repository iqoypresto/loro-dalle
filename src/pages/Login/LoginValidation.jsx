function validate (values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Email yang Anda masukkan tidak terdaftar";
    }
    if (!values.password) {
      errors.password = "Kata sandi yang Anda masukkan salah";
    }
    return errors;
  }
  export default validate;