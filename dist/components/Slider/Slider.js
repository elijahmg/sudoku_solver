import React, {useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import "./Slider.css.proxy.js";
const Slider = () => {
  const blockRef = useRef(null);
  const [x, setX] = useState(0);
  const [xStart, setXStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [isDragging]);
  useEffect(() => {
    if (blockRef.current) {
      setXStart(blockRef.current.getBoundingClientRect().x);
    }
  }, [blockRef]);
  const mouseMove = (e) => {
    if (!isDragging)
      return;
    if (e.pageX < xStart + 15 || e.pageX > xStart + 200 - 7.5)
      return;
    setX((x2) => x2 + e.movementX);
  };
  const mouseUp = (e) => {
    setIsDragging(false);
  };
  const mouseDown = (e) => {
    setIsDragging(true);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "wrapper"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "line",
    ref: blockRef
  }), /* @__PURE__ */ React.createElement("div", {
    className: "block",
    onMouseDown: mouseDown,
    style: {left: `${x}px`}
  }));
};
export default Slider;
