import {emptySudoku, sudoku as defaultSudoku} from "./util.js";
var ActionType;
(function(ActionType2) {
  ActionType2["FULL_RESET"] = "fullReset";
  ActionType2["RESET_BEFORE_SOLVE"] = "resetBeforeSolve";
  ActionType2["EXAMPLE_RESET"] = "exampleReset";
  ActionType2["SET_SUDOKU"] = "setSudoku";
  ActionType2["SET_SELECTED"] = "setSelected";
  ActionType2["SET_IS_VALID_SUDOKU"] = "setIsValidSudoku";
  ActionType2["SET_POSSIBLE_VALUES"] = "setPossibleValues";
  ActionType2["ON_CLICK"] = "onClick";
})(ActionType || (ActionType = {}));
const initialState = {
  isValidSudoku: void 0,
  sudoku: emptySudoku,
  selected: null,
  possibleValues: void 0,
  copySudoku: emptySudoku,
  isCustom: true
};
function reducer(state, action) {
  switch (action.type) {
    case ActionType.FULL_RESET: {
      return {
        isValidSudoku: void 0,
        sudoku: emptySudoku,
        selected: null,
        possibleValues: void 0,
        copySudoku: emptySudoku,
        isCustom: true
      };
    }
    case ActionType.RESET_BEFORE_SOLVE: {
      return {
        ...state,
        isValidSudoku: false,
        selected: null,
        copySudoku: state.sudoku,
        isCustom: false
      };
    }
    case ActionType.EXAMPLE_RESET: {
      return {
        ...state,
        sudoku: defaultSudoku,
        copySudoku: defaultSudoku,
        selected: null,
        possibleValues: void 0
      };
    }
    case ActionType.SET_SUDOKU: {
      return {
        ...state,
        sudoku: action.value
      };
    }
    case ActionType.SET_SELECTED: {
      return {
        ...state,
        selected: action.value
      };
    }
    case ActionType.SET_POSSIBLE_VALUES: {
      return {
        ...state,
        possibleValues: action.value
      };
    }
    case ActionType.SET_IS_VALID_SUDOKU: {
      return {
        ...state,
        isValidSudoku: action.value
      };
    }
    case ActionType.ON_CLICK: {
      return {
        ...state,
        isValidSudoku: void 0,
        selected: action.value
      };
    }
    default:
      throw new Error();
  }
}
export {reducer, initialState, ActionType};
