export function validate (values) {
    let errors = {};
    if (!values.fullname) {
      errors.fullname = "Harap isi kolom ini!";
    }
    if (!values.telnumber) {
      errors.telnumber = "Harap isi kolom ini!";
    }
    if (!values.email) {
      errors.email = "Harap isi kolom ini!";
    }
    if (!values.password) {
      errors.password = "Harap isi kolom ini!";
    }
    if (!(values.confirmpassword === values.password)) {
      errors.confirmpassword = "Password tidak sama!";
    }
    return errors;
  }