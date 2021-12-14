import { TextField } from "@mui/material";
import React from "react";

export default function CustomTextField(props) {
  const { name, label, formik } = props;
  return (
    <TextField
      margin="normal"
      {...props}
      fullWidth
      id={name}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
}
