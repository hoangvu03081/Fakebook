import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";
import { BiError } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";

import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Tooltip,
} from "reactstrap";
import { AiOutlineYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";

export const transformInitialVals = (initialValues) => {
  const res = {};
  for (const [key, value] of Object.entries(initialValues)) {
    res[key] = Boolean(value);
  }
  return res;
};

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      password: yup.string().required("Password is required"),
      username: yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const {
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
    <div className="register-form">
      <Form onSubmit={handleSubmit}>
        <div className="heading">
          <h1>
            Sign in
            <span className="bottom" style={{ width: 100 }}></span>
          </h1>
          <div>
            <AiOutlineYoutube
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
            <GrGroup style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <FormGroup>
          <Label for="username">USERNAME</Label>
          <InputGroup>
            <Input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              onFocus={(e) => handleFocus(e, true)}
              onBlur={(e) => {
                handleBlur(e);
                handleFocus(e, false);
              }}
              name="username"
              id="username"
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
          <Label for="password">PASSWORD</Label>
          <InputGroup>
            <Input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              onFocus={(e) => handleFocus(e, true)}
              onBlur={(e) => {
                handleBlur(e);
                handleFocus(e, false);
              }}
              name="password"
              id="password"
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
        <FormGroup className="w-100">
          <button type="submit" className="btn s">
            Sign in
          </button>
        </FormGroup>

        <FormGroup check className="d-flex justify-content-between">
          <Label className="pl-2" check>
            <Input type="checkbox" /> Remember Me
            <div className="checkmark"></div>
          </Label>
          <span className="text-secondary cursor-pointer">Forgot Password</span>
        </FormGroup>

        <p className="d-flex align-items-center mt-3 justify-content-between">
          Don't have an account?{" "}
          <Link to="/register" className="btn s-outline">Sign Up</Link>
        </p>
      </Form>
    </div>
  );
}
