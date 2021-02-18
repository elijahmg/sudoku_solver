import { emptySudoku, sudoku as defaultSudoku } from './util';

type Sudoku = Array<Array<number>>;

interface State {
  isValidSudoku: boolean | undefined,
  sudoku: Sudoku,
  selected: null,
  possibleValues: undefined | Array<number>,
  copySudoku: Sudoku,
  isCustom: boolean | undefined,
}

enum ActionType {
  FULL_RESET = 'fullReset',
  RESET_BEFORE_SOLVE = 'resetBeforeSolve',
  EXAMPLE_RESET = 'exampleReset',
  SET_SUDOKU = 'setSudoku',
  SET_SELECTED = 'setSelected',
  SET_IS_VALID_SUDOKU = 'setIsValidSudoku',
  SET_POSSIBLE_VALUES = 'setPossibleValues',
  ON_CLICK = 'onClick',
}


interface Action {
  type: ActionType; // @TODO Enum
  value?: any,
}

const initialState: State = {
  isValidSudoku: undefined,
  sudoku: emptySudoku,
  selected: null,
  possibleValues: undefined,
  copySudoku: emptySudoku,
  isCustom: true,
};


function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.FULL_RESET: {
      return {
        isValidSudoku: undefined,
        sudoku: emptySudoku,
        selected: null,
        possibleValues: undefined,
        copySudoku: emptySudoku,
        isCustom: true,
      } as State;
    }

    case ActionType.RESET_BEFORE_SOLVE: {
      return {
        ...state,
        isValidSudoku: false,
        selected: null,
        copySudoku: state.sudoku,
        isCustom: false,
      } as State;
    }

    case ActionType.EXAMPLE_RESET: {
      return {
        ...state,
        sudoku: defaultSudoku,
        copySudoku: defaultSudoku,
        selected: null,
        possibleValues: undefined,
      } as State;
    }

    case ActionType.SET_SUDOKU: {
      return {
        ...state,
        sudoku: action.value,
      } as State;
    }

    case ActionType.SET_SELECTED: {
      return {
        ...state,
        selected: action.value,
      } as State;
    }

    case ActionType.SET_POSSIBLE_VALUES: {
      return {
        ...state,
        possibleValues: action.value,
      } as State;
    }

    case ActionType.SET_IS_VALID_SUDOKU: {
      return {
        ...state,
        isValidSudoku: action.value,
      } as State;
    }

    case ActionType.ON_CLICK: {
      return {
        ...state,
        isValidSudoku: undefined,
        selected: action.value
      } as State;
    }

    default:
      throw new Error();
  }
}

export { reducer, initialState, ActionType, Action };