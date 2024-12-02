import React, { useState, useMemo } from "react";
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Select = ({ options, margin, variant, onChange, label, placeholder }) => {
  const [indexSelectedElem, setIndexSelectedElem] = useState(null);

  const handleClick = (value) => {
    setIndexSelectedElem(value.target.id);
    if (onChange) {
      onChange(value.target.id);
    }
  };

  useMemo(() => {
    console.log("indexElem: ", indexSelectedElem);
  }, [indexSelectedElem]);

  return (
    <div>
      <FormControl margin={margin} variant={variant} fullWidth>
        <InputLabel>{label}</InputLabel>
        <MuiSelect options={options} label={label} placeholder={placeholder}>
          {options.map((value, index) => (
            <MenuItem id={index} onClick={handleClick}>
              {value}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
};

export default Select;
