import React, {useState} from "../../../_snowpack/pkg/react.js";
import cx from "../../../_snowpack/pkg/classnames.js";
import Button from "../Button/Button.js";
import {sudoku as defaultS} from "./util.js";
import Solver from "../../utils/solver.js";
import "./Grid.css.proxy.js";
import Slider from "../Slider/Slider.js";
const Grid = () => {
  const [sudoku, setSudoku] = useState(defaultS);
  const [selected, setSelected] = useState(null);
  const keyListener = (e) => {
    const keyAsNumber = Number(e.key);
    if (Number.isInteger(keyAsNumber) && selected) {
      if (sudoku[selected[0]][selected[1]] === 0) {
        const copySud = JSON.parse(JSON.stringify(sudoku));
        copySud[selected[0]][selected[1]] = keyAsNumber;
        setSudoku(copySud);
      }
    }
  };
  const isIntersection = (coord) => {
    if (selected) {
      return coord.every((el, index) => el === selected[index]);
    }
    return false;
  };
  const solve = async () => {
    const solver = new Solver(sudoku);
    const isValid = solver.isValidSudoku();
    const isSolved = await solver.solve([0, 0], setSudoku);
    console.log({isSolved});
    console.log({isValid});
  };
  const onClick = (coord) => {
    const newCoord = isIntersection(coord) ? null : coord;
    setSelected(newCoord);
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "game-wrapper"
  }, /* @__PURE__ */ React.createElement("table", {
    className: "game-table"
  }, /* @__PURE__ */ React.createElement("tbody", null, sudoku.map((row, i) => /* @__PURE__ */ React.createElement("tr", {
    className: "row",
    key: i
  }, row.map((num, j) => /* @__PURE__ */ React.createElement("td", {
    className: cx("cell", {
      selected: isIntersection([i, j]),
      isNew: defaultS[i][j] === 0
    }),
    key: j,
    onClick: () => onClick([i, j]),
    tabIndex: 0,
    onKeyDown: keyListener
  }, /* @__PURE__ */ React.createElement("div", {
    className: "cell-value"
  }, num || "")))))))), /* @__PURE__ */ React.createElement(Button, {
    className: "margin-top",
    onClick: solve
  }, "Solve sudoku"), /* @__PURE__ */ React.createElement(Slider, null));
};
export default Grid;
