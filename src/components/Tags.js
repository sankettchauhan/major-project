import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Tags({ tags, setTags }) {
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={[]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label="Enter tags" margin="normal" />
      )}
      freeSolo
      value={tags}
      onChange={(event, values) => {
        setTags(values);
      }}
    />
  );
}
