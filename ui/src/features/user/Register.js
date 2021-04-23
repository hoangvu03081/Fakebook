import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { BiError } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { register } from "./userSlice";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Tooltip,
} from "reactstrap";
import { transformInitialVals } from "./Login";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      username: yup.string().required("Username is required"),
    }),
    onSubmit: async (values) => {
      await register(values);
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
    initialValues,
  } = formik;

  const [focused, setFocused] = useState(transformInitialVals(initialValues));

  const handleFocus = (e, isFocus) => {
    setFocused({ ...focused, [e.target.name]: isFocus });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="register-form">
        <div className="heading">
          <h1>
            Welcome to Fakebook
            <span className="bottom" style={{ width: 120 }}></span>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <InputGroup>
              <Input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                name="name"
                onChange={handleChange}
                onFocus={(e) => handleFocus(e, true)}
                onBlur={(e) => {
                  handleBlur(e);
                  handleFocus(e, false);
                }}
                value={values.name}
              />
              {touched.name && errors.name && (
                <InputGroupAddon
                  addonType="append"
                  className="tooltip-input-error"
                >
                  <BiError />
                  <Tooltip
                    placement="right"
                    isOpen={focused.name}
                    target="name"
                  >
                    {errors.name}
                  </Tooltip>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <InputGroup>
              <Input
                type="text"
                className="form-control"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleChange}
                onFocus={(e) => handleFocus(e, true)}
                onBlur={(e) => {
                  handleBlur(e);
                  handleFocus(e, false);
                }}
                value={values.email}
              />
              {touched.email && errors.email && (
                <InputGroupAddon
                  addonType="append"
                  className="tooltip-input-error"
                >
                  <BiError />
                  <Tooltip
                    placement="right"
                    isOpen={focused.email}
                    target="email"
                  >
                    {errors.email}
                  </Tooltip>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="dob">Date of birth</Label>
            <InputGroup>
              <DatePicker
                autoComplete="off"
                className="form-control"
                id="dob"
                name="dob"
                onFocus={(e) => handleFocus(e, true)}
                onBlur={(e) => {
                  handleBlur(e);
                  handleFocus(e, false);
                }}
                onChange={(e) => {
                  setFieldTouched("dob", true);
                  setFieldValue("dob", e);
                }}
                placeholderText="dd/mm/yyyy"
                selected={values.dob}
              />
              {touched.dob && errors.dob && (
                <InputGroupAddon
                  addonType="append"
                  className="tooltip-input-error"
                >
                  <BiError />
                  <Tooltip placement="right" isOpen={focused.dob} target="dob">
                    {errors.dob}
                  </Tooltip>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label for="username">Username</Label>
            <InputGroup>
              <Input
                type="text"
                className="form-control"
                placeholder="Username"
                id="username"
                name="username"
                onChange={handleChange}
                onFocus={(e) => handleFocus(e, true)}
                onBlur={(e) => {
                  handleBlur(e);
                  handleFocus(e, false);
                }}
                value={values.username}
              />
              {touched.username && errors.username && (
                <InputGroupAddon
                  addonType="append"
                  className="tooltip-input-error"
                >
                  <BiError />
                  <Tooltip
                    placement="right"
                    isOpen={focused.username}
                    target="username"
                  >
                    {errors.username}
                  </Tooltip>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <InputGroup>
              <Input
                type="text"
                className="form-control"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
                onFocus={(e) => handleFocus(e, true)}
                onBlur={(e) => {
                  handleBlur(e);
                  handleFocus(e, false);
                }}
                value={values.password}
              />
              {touched.password && errors.password && (
                <InputGroupAddon
                  addonType="append"
                  className="tooltip-input-error"
                >
                  <BiError />
                  <Tooltip
                    placement="right"
                    isOpen={focused.password}
                    target="password"
                  >
                    {errors.password}
                  </Tooltip>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <button type="submit" className="btn s">
              Register
            </button>
          </FormGroup>
          <p className="m-0 d-flex justify-content-between align-items-center">Already have a account? <Link to="/login" className="btn s-outline s-bold">Sign In</Link></p>
        </form>
      </div>
    </div>
  );
}
