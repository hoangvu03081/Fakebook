import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import React, { useRef } from "react";
import { TooltipIcon } from "../../../components/Tooltip/Tooltip";
import { BiError } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { apiDomain } from "../../../configs/constants";
import { MySwal } from "../../../components/Swal/Swal";
import { history } from "../../..";
import { register } from "../userSlice";

export const registerToolTipStyles = {
  position: "absolute",
  borderRadius: "50%",
  right: 0,
  bottom: 18,
  height: 37,
  width: 37,
};

export default function Register() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      dob: "",
      email: "",
      name: "",
      password: "",
      username: "",
    },
    validationSchema: yup.object({
      dob: yup.string().required("Date of birth is required"),
      email: yup.string().required("Email is required").email(),
      name: yup.string().required("Name is required").max(50),
      password: yup.string().required("Password is required"),
      // .min(8, "Password must be at least 8 characters")
      // .matches(/[0-9]/, "Password must have at least one number")
      // .matches(/[A-Za-z] /, "Password must have at least one letter")
      username: yup.string().required("Username is required"),
      // .min(5)
    }),
    onSubmit: async (values) => {
      const y = values.dob.getFullYear();
      let m = values.dob.getMonth();
      m = m < 10 ? "0" + m : m;
      let d = values.dob.getDate();
      d = d < 10 ? "0" + d : d;
      const dob = `${y}-${m}-${d}`;

      const userDto = {
        ...values,
        dob,
        id: 0,
        avatar: "",
      };

      await register(userDto);
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
    <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
      <div className="register-form" style={{ height: 560 }}>
        <div className="heading">
          <h1 className="lead fw-bold" style={{ fontSize: 32 }}>
            Welcome
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="position-relative" style={{ height: 80 }}>
            <label>NAME</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name && (
              <TooltipIcon
                customClass="tooltip-filldanger"
                style={registerToolTipStyles}
                direction="right"
                tooltipText={<BiError />}
                title={errors.name}
              />
            )}
          </div>
          <div className="position-relative" style={{ height: 80 }}>
            <label>EMAIL</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              value={values.email}
            />
            {touched.email && errors.email && (
              <TooltipIcon
                customClass="tooltip-filldanger"
                style={registerToolTipStyles}
                direction="right"
                tooltipText={<BiError />}
                title={errors.email}
              />
            )}
          </div>
          <div className="position-relative" style={{ height: 80 }}>
            <label>DAY OF BIRTH</label>
            <DatePicker
              autoComplete="off"
              className="form-control"
              name="dob"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldTouched("dob", true);
                setFieldValue("dob", e);
              }}
              placeholderText="dd/mm/yyyy"
              selected={values.dob}
            />
            {touched.dob && errors.dob && (
              <TooltipIcon
                customClass="tooltip-filldanger"
                style={registerToolTipStyles}
                direction="right"
                tooltipText={<BiError />}
                title={errors.dob}
              />
            )}
          </div>

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
          <button type="submit" className="btn s s-lg text-success mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
