import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { TooltipIcon } from "../../../components/Tooltip/Tooltip";
import { BiError } from "react-icons/bi";
import { registerToolTipStyles } from "../Register/Register";

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      password: yup.string().required("Password is required"),
      // .min(8, "Password must be at least 8 characters")
      // .matches(/[0-9]/, "Password must have at least one number")
      // .matches(/[A-Za-z]/, "Password must have at least one letter")
      username: yup.string().required("Username is required"),
      // .min(5)
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const {
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = formik;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="register-form" style={{ height: 320 }}>
        <div className="heading">
          <h1 className="lead fw-bold" style={{ fontSize: 32 }}>
            Welcome back!
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="position-relative" style={{ height: 80 }}>
            <label>USERNAME</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              value={values.username}
            />
            {touched.username && errors.username && (
              <TooltipIcon
                customClass="tooltip-filldanger"
                style={registerToolTipStyles}
                direction="right"
                tooltipText={<BiError />}
                title={errors.username}
              />
            )}
          </div>
          <div className="position-relative" style={{ height: 80 }}>
            <label>PASSWORD</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              value={values.password}
            />
            {touched.password && errors.password && (
              <TooltipIcon
                customClass="tooltip-filldanger"
                style={registerToolTipStyles}
                direction="right"
                tooltipText={<BiError />}
                title={errors.password}
              />
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center pe-4">
            <button type="submit" className="btn s text-success">
              Login
            </button>
            <span>or</span>
            <button type="submit" className="btn text-secondary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
