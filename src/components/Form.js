import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CustomTextField from "./CustomTextField";
import MultiTextInput from "./MultiTextInput";

const validationSchema = yup.object({
  title: yup.string("Enter title of article").required("Title is required"),
  dateCreated: yup.date().required(),
});

export default function Form({ setArticle }) {
  const [tags, setTags] = React.useState([]);
  const [content, setContent] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      dateCreated: new Date().toISOString(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setArticle({ ...values, tags, content });
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
        <MultiTextInput
          value={content}
          setValue={setContent}
          label={"Enter content"}
        />
        <CustomTextField
          name="dateCreated"
          label="Enter date"
          formik={formik}
          disabled={true}
        />
        {/* tags */}
        <MultiTextInput value={tags} setValue={setTags} label={"Enter tags"} />
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
