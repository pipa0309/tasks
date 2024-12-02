import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ variant, color, children, margin, onClick }) => {
  return (
    <div>
      <MuiButton
        variant={variant}
        color={color}
        onClick={onClick}
        margin={margin}
      >
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
