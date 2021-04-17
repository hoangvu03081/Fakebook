import {
  DatePicker,
  DatePickerInput,
  TooltipIcon,
} from "carbon-components-react";
import { useFormik } from "formik";
import { MisuseOutline32 } from "@carbon/icons-react";
import * as yup from "yup";
import axios from "axios";
import React, { useRef } from "react";
import { domain } from "../../configs/constants";
import { history } from "../..";
import { MySwal } from "../../components/Swal/Swal";

export default function Register() {
  const ref = useRef(null);

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
      // .matches(/[A-Za-z]/, "Password must have at least one letter")
      username: yup.string().required("Username is required"),
      // .min(5)
    }),
    onSubmit: (values) => {
      const y = values.dob.slice(6);
      const m = values.dob.slice(3, 5);
      const d = values.dob.slice(0, 2);
      const dob = `${y}-${m}-${d}`;

      console.log({ ...values, dob });
      axios
        .post(`${domain}/api/auth/register`, {
          ...values,
          dob,
          avatar: "",
          id: 0,
        })
        .then((result) => {
          MySwal.fire({
            title: "Register success!",
            text:
              "Welcome to Fakebook. The social is waiting for you, login now!!!",
            confirmButtonColor: "#3085d6",
            icon: "success",
            confirmButtonText: "Go to Login",
          }).then((res) => {
            if (res.isConfirmed) history.push("/login");
          });
        });
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
                className="position-absolute fill-danger"
                style={{ right: 10, bottom: 20 }}
                direction="right"
                tooltipText={errors.name}
              >
                <MisuseOutline32 />
              </TooltipIcon>
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
                className="position-absolute fill-danger"
                style={{ right: 10, bottom: 20 }}
                direction="right"
                tooltipText={errors.email}
              >
                <MisuseOutline32 />
              </TooltipIcon>
            )}
          </div>
          <div className="position-relative" style={{ height: 80 }}>
            <label>DAY OF BIRTH</label>
            <DatePicker
              className="bx--date-picker__input"
              datePickerType="single"
              dateFormat="d/m/Y"
              onChange={(_, dob) => setFieldValue("dob", dob)}
              ref={ref}
            >
              <DatePickerInput
                autoComplete="off"
                placeholder="mm/dd/yyyy"
                labelText=""
                id="register-date-picker"
                name="dob"
                onChange={handleChange}
                onBlur={(e) => {
                  if (
                    e.relatedTarget?.classList.value !==
                    "flatpickr-day bx--date-picker__day"
                  ) {
                    handleBlur(e);
                  }
                }}
              />
            </DatePicker>
            {touched.dob && errors.dob && (
              <TooltipIcon
                className="position-absolute fill-danger"
                style={{ right: 38, bottom: 19 }}
                direction="right"
                tooltipText={errors.dob}
              >
                <MisuseOutline32 />
              </TooltipIcon>
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
                className="position-absolute fill-danger"
                style={{ right: 10, bottom: 20 }}
                direction="right"
                tooltipText={errors.username}
              >
                <MisuseOutline32 />
              </TooltipIcon>
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
                className="position-absolute fill-danger"
                style={{ right: 10, bottom: 20 }}
                direction="right"
                tooltipText={errors.password}
              >
                <MisuseOutline32 />
              </TooltipIcon>
            )}
          </div>
          <button type="submit" className="btn s text-success mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
