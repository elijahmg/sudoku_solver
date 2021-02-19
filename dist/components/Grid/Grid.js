import React, {useEffect, useReducer, useState} from "../../../_snowpack/pkg/react.js";
import cx from "../../../_snowpack/pkg/classnames.js";
import Button from "../Button/Button.js";
import Solver from "../../utils/solver.js";
import styles from "./Grid.module.css.proxy.js";
import Input from "../Input/Input.js";
import {initialState, reducer, ActionType} from "./state.js";
const Grid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {possibleValues, copySudoku, isCustom, isValidSudoku, selected, sudoku} = state;
  const [delay, setDelay] = useState(0);
  useEffect(() => {
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [selected]);
  const keyListener = (e) => {
    const keyAsNumber = Number(e.key);
    if (Number.isInteger(keyAsNumber)) {
      setNumber(keyAsNumber);
    }
  };
  const isIntersection = (coord) => {
    if (selected) {
      return coord.every((el, index) => el === selected[index]);
    }
    return false;
  };
  const solve = async () => {
    dispatch({type: ActionType.RESET_BEFORE_SOLVE});
    const solver = new Solver(sudoku, delay);
    if (!solver.isValidSudoku()) {
      dispatch({type: ActionType.SET_IS_VALID_SUDOKU, value: true});
    } else {
      await solver.solve([0, 0], dispatch);
      dispatch({type: ActionType.SET_SELECTED, value: null});
    }
  };
  const onReset = () => {
    dispatch({type: ActionType.FULL_RESET});
  };
  const onSetExample = () => {
    dispatch({type: ActionType.EXAMPLE_RESET});
  };
  const onClick = (coord) => {
    dispatch({type: ActionType.ON_CLICK, value: isIntersection(coord) ? null : coord});
  };
  const setNumber = (num) => {
    if (selected) {
      const copySud = JSON.parse(JSON.stringify(sudoku));
      copySud[selected[0]][selected[1]] = num;
      dispatch({type: ActionType.SET_SUDOKU, value: copySud});
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.flex
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.gameWrapper
  }, /* @__PURE__ */ React.createElement("table", {
    className: styles.gameTable
  }, /* @__PURE__ */ React.createElement("tbody", null, sudoku.map((row, i) => /* @__PURE__ */ React.createElement("tr", {
    className: styles.row,
    key: i
  }, row.map((num, j) => /* @__PURE__ */ React.createElement("td", {
    className: cx(styles.cell, {
      [styles.selected]: isIntersection([i, j]),
      [styles.isNew]: copySudoku[i][j] === 0 && !isCustom
    }),
    key: j,
    onClick: () => onClick([i, j]),
    tabIndex: 0
  }, num || ""))))))), /* @__PURE__ */ React.createElement("div", {
    className: styles.possibleValues
  }, /* @__PURE__ */ React.createElement("table", {
    className: styles.table
  }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", {
    className: styles.row
  }, Array.from({length: 9}, (_, i) => i + 1).map((num) => /* @__PURE__ */ React.createElement("td", {
    className: styles.cell,
    key: num,
    onClick: () => setNumber(num)
  }, num))))), isValidSudoku && /* @__PURE__ */ React.createElement("span", {
    style: {
      color: "red"
    }
  }, "Your sudoku is not valid"), /* @__PURE__ */ React.createElement("span", null, "Fill up your own sudoku or set example sudoku"), /* @__PURE__ */ React.createElement("span", null, "Select cell by mouse and use numbers on keyboard"), /* @__PURE__ */ React.createElement("span", null, "Possible values: [", possibleValues?.join(", "), "]"), /* @__PURE__ */ React.createElement(Input, {
    onChange: (value) => setDelay(Number(value)),
    value: delay,
    className: styles.input,
    type: "number"
  }, "Delay, ms"), /* @__PURE__ */ React.createElement("div", {
    className: styles.buttonGroup
  }, /* @__PURE__ */ React.createElement(Button, {
    onClick: solve
  }, "Solve sudoku"), /* @__PURE__ */ React.createElement(Button, {
    onClick: onReset
  }, "Reset"), /* @__PURE__ */ React.createElement(Button, {
    onClick: onSetExample
  }, "Set example sudoku"))));
};
export default Grid;
