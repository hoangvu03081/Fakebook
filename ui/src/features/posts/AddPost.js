import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { TooltipIcon } from "../../components/Tooltip/Tooltip";
import { registerToolTipStyles } from "../user/Register/Register";
import { BiError } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addPost } from "./postsSlice";

export default function AddPost() {
  const [file, setFile] = useState(null);
  const [focus, setFocus] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: yup.object({
      content: yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      let sendValues = { file, content: values.content };
      dispatch(addPost(sendValues));
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <form
      className="p-3"
      onSubmit={handleSubmit}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <p>Share your content with others.</p>
      <div className="position-relative mb-3">
        <textarea
          onChange={handleChange}
          onBlur={handleBlur}
          name="content"
          value={values.content}
          className="form-control"
          placeholder="Today I'm feeling great!"
        ></textarea>
        {focus && touched.content && errors.content && (
          <TooltipIcon
            customClass="tooltip-filldanger"
            style={registerToolTipStyles}
            direction="right"
            tooltipText={<BiError />}
            title={errors.content}
          />
        )}
      </div>
      <div className="mb-3">
        <p>Or some pictures</p>
        <input className="form-control" type="file" onChange={handleFile} />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary">Upload</button>
      </div>
    </form>
  );
}
