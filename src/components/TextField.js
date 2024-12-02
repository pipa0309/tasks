import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ label, value, onChange, margin }) => {
  return (
    <div>
      <MuiTextField
        label={label}
        value={value}
        onChange={onChange}
        margin={margin}
      ></MuiTextField>
    </div>
  );
};

export default TextField;
