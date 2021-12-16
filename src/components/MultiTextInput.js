import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function MultiTextInput({ value, setValue, label }) {
  return (
    <Autocomplete
      multiple
      options={[]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} margin="normal" />
      )}
      freeSolo
      value={value}
      onChange={(event, values) => {
        setValue(values);
      }}
    />
  );
}
