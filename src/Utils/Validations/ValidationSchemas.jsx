import * as Yup from "yup";

export const changePasswordValidation = Yup.object().shape({
  current_password: Yup.string().required("Current Password is required"),
  password: Yup.string().required("New Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match.")
    .label("Confirm Password"),
});
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required("Password is required"),
});
export const forgotPassword = Yup.object().shape({
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .label("Confirm Password"),
});
export const forgotEmail = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});
export const forgotCode = Yup.object().shape({
  code: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{4}$/, "Verification code must be 4 digits"),
});