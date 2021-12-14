import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CustomTextField from "./CustomTextField";
import Tags from "./Tags";

const validationSchema = yup.object({
  title: yup.string("Enter title of article").required("Title is required"),
  content: yup.string("Enter body of article").required("Body is required"),
  dateCreated: yup.date().required(),
});

export default function Form({ setArticle }) {
  const [tags, setTags] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      dateCreated: new Date().toISOString(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setArticle({ ...values, tags });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <CustomTextField
          autoFocus={true}
          name="title"
          label="Enter title"
          formik={formik}
        />
        <CustomTextField
          name="content"
          label="Enter content"
          formik={formik}
          multiline={true}
          rows={4}
        />
        <CustomTextField
          name="dateCreated"
          label="Enter date"
          formik={formik}
          disabled={true}
        />
        <Tags tags={tags} setTags={setTags} />
        <Button
          sx={{ marginTop: "1em" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
