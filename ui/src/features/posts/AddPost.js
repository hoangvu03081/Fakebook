import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";

import {
  Button,
  Card,
  CardTitle,
  CustomInput,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useEffect } from "react";

export default function AddPost() {
  const name = useSelector((state) => state.user.data.name);

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: yup.object({
      content: yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      let sendValues = { ufile: file, content: values.content };
      dispatch(addPost(sendValues));
    },
  });
  const { values, errors, handleChange, handleBlur, handleSubmit } = formik;

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => handleChange({ target: { name: "content", value: "" } }), []);

  return (
    <Card className="p-4 add-post">
      <CardTitle tag="h3" className="text-center">
        Create a post
        <hr />
      </CardTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="position-relative">
          <Input
            type="textarea"
            onChange={handleChange}
            onBlur={handleBlur}
            id="content"
            name="content"
            value={values.content}
            className="form-control post-input-content"
            placeholder={`Hello ${name}, what are your feeling now?`}
          ></Input>
        </FormGroup>
        <FormGroup>
          <CustomInput
            id="file"
            type="file"
            onChange={handleFile}
            label="Add a picture to the post"
          />
        </FormGroup>
        <div className="mb-3">
          <Button
            color="primary"
            className="w-100"
            disabled={Boolean(errors.content)}
            type="submit"
          >
            Upload
          </Button>
        </div>
      </Form>
    </Card>
  );
}
