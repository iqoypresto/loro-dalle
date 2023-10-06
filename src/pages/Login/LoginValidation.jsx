export function validate (values) {
    let errors = {};
    if (!values.password) {
      errors.password = "Email/Nomor HP atau Password yang Anda masukkan salah";
    }
    return errors;
}