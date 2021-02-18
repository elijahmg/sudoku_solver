import React from "../../../_snowpack/pkg/react.js";
import "./Input.module.css.proxy.js";
const Input = ({
  children,
  onChange,
  value,
  className,
  type = "text"
}) => {
  return /* @__PURE__ */ React.createElement("label", {
    className
  }, children, /* @__PURE__ */ React.createElement("input", {
    onChange: (e) => onChange(e.target.value),
    value,
    type
  }));
};
export default Input;
