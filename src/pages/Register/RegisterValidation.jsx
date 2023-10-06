export function validate (values) {
    let errors = {};
    if (!values.fullName) {
      errors.fullName = "Harap isi kolom ini!";
    }
    if (!values.telNumber) {
      errors.telNumber = "Harap isi kolom ini!";
    }
    if (!values.password) {
      errors.password = "Harap isi kolom ini!";
    }
    if (!values.address) {
      errors.address = "Harap isi kolom ini!";
    }
    if (!(values.confirmPassword === values.password)) {
      errors.confirmPassword = "Password tidak sama!";
    }
    return errors;
  }