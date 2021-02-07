import React from "../../../_snowpack/pkg/react.js";
import "./Button.css.proxy.js";
const Button = ({className, onClick, children}) => {
  return /* @__PURE__ */ React.createElement("button", {
    onClick,
    className
  }, children);
};
export default Button;
